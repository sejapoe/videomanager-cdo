package org.sejapoe.videomanager.service

import jakarta.transaction.Transactional
import org.sejapoe.videomanager.exception.ForbiddenException
import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.exception.auth.EmailDoesntExistsLoginException
import org.sejapoe.videomanager.model.RefreshToken
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.repo.RefreshTokenRepo
import org.sejapoe.videomanager.repo.UserActivationRepo
import org.sejapoe.videomanager.repo.UserRepo
import org.sejapoe.videomanager.security.JwtService
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.nio.ByteBuffer
import java.security.SecureRandom
import java.time.Instant
import java.util.*
import kotlin.random.asKotlinRandom

@Service
class AuthService(
    private val userRepo: UserRepo,
    private val authenticationManager: AuthenticationManager,
    private val jwtService: JwtService,
    private val refreshTokenRepo: RefreshTokenRepo,
    private val userActivationRepo: UserActivationRepo,
    private val passwordEncoder: PasswordEncoder
) {

    @Transactional
    fun login(
        email: String,
        password: String,
    ): Pair<User, Tokens> {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(email, password),
        )

        val user = userRepo.findByEmail(email) ?: throw EmailDoesntExistsLoginException()

        val tokenPair = generateTokenPair(user)
        refreshTokenRepo.save(RefreshToken(user = user, token = tokenPair.refresh))

        return user to tokenPair
    }

    @Transactional
    fun refresh(
        token: String,
    ): Pair<User, Tokens> {
        val currentRefreshToken = refreshTokenRepo.findByToken(token) ?: throw ForbiddenException("Wrong refresh token")

        val user = currentRefreshToken.user

        if (!user.enabled) {
            throw ForbiddenException("Your account is disabled")
        }

        val tokenPair = generateTokenPair(user)
        currentRefreshToken.token = tokenPair.refresh
        refreshTokenRepo.save(currentRefreshToken)

        return user to tokenPair
    }

    @Transactional
    fun getUserActivation(uuid: UUID) =
        userActivationRepo.findByUuid(uuid) ?: throw NotFoundException("Неизвестный код активации")

    @Transactional
    fun getUserByActivationUuid(uuid: UUID) = getUserActivation(uuid).user

    @Transactional
    fun activateLecturer(
        uuid: UUID,
        password: String,
    ): Pair<User, Tokens> {
        val activator = getUserActivation(uuid)
        activator.user.password = passwordEncoder.encode(password)
        activator.user.enabled = true
        val user = userRepo.save(activator.user)
        userActivationRepo.delete(activator)
        val tokenPair = generateTokenPair(user)
        refreshTokenRepo.save(RefreshToken(user = user, token = tokenPair.refresh))
        return user to tokenPair
    }

    private fun generateTokenPair(user: User): Tokens {
        return Tokens(
            access = jwtService.generateToken(user),
            refresh = randomRefreshToken()
        )
    }

    private fun randomRefreshToken(): String {
        val secureRandom = SecureRandom.getInstanceStrong().asKotlinRandom()

        val randomBytes = secureRandom.nextBytes(32)

        val timestampBytes =
            ByteBuffer.allocate(Long.SIZE_BYTES)
                .putLong(Instant.now().toEpochMilli())
                .array()

        val combinedBytes = randomBytes + timestampBytes

        return Base64.getEncoder().encodeToString(combinedBytes)
    }

    data class Tokens(
        val access: String,
        val refresh: String
    )
}