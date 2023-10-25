package org.sejapoe.videomanager.service

import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.exception.UserActivationNotFoundException
import org.sejapoe.videomanager.exception.auth.EmailAlreadyExitsRegistrationException
import org.sejapoe.videomanager.exception.auth.EmailDoesntExistsLoginException
import org.sejapoe.videomanager.model.Role
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.model.UserActivation
import org.sejapoe.videomanager.repo.UserActivationRepo
import org.sejapoe.videomanager.repo.UserRepo
import org.sejapoe.videomanager.security.JwtService
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(
    private val userRepo: UserRepo,
    private val jwtService: JwtService,
    private val authenticationManager: AuthenticationManager,
    private val passwordEncoder: PasswordEncoder,
    private val userActivationRepo: UserActivationRepo
) {

    fun register(email: String, password: String, fullName: String): Pair<String, User> {
        if (userRepo.findByEmail(email) != null) {
            throw EmailAlreadyExitsRegistrationException()
        }

        val user = User(email, passwordEncoder.encode(password), fullName, Role.ROLE_USER, true)
        userRepo.save(user)
        return jwtService.generateToken(user) to user
    }

    fun login(email: String, password: String): Pair<User, String> {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(email, password)
        )

        val user = userRepo.findByEmail(email) ?: throw EmailDoesntExistsLoginException()

        return user to jwtService.generateToken(user)
    }

    fun createLecturer(name: String, email: String): User {
        val user = User(email, "", name, Role.ROLE_USER, false)
        val activator = UserActivation(UUID.randomUUID(), user)
        userActivationRepo.save(activator)
        return user
    }

    fun getUserActivation(uuid: UUID) = userActivationRepo.findByUuid(uuid) ?: throw UserActivationNotFoundException()

    fun getUserByActivationUuid(uuid: UUID) = getUserActivation(uuid).user
    fun activateLecturer(uuid: UUID, password: String): Pair<User, String> {
        val activator = getUserActivation(uuid)
        activator.user.password = passwordEncoder.encode(password)
        activator.user.enabled = true
        val user = userRepo.save(activator.user)
        userActivationRepo.delete(activator)
        return user to jwtService.generateToken(user)
    }

    fun getLecturers(): List<User> {
        return userRepo.findByRole(Role.ROLE_USER)
    }

    fun get(id: Long): User = userRepo.findById(id).orElseThrow { NotFoundException("User with $id is not found") }
}