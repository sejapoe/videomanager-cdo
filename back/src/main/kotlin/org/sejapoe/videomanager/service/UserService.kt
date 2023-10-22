package org.sejapoe.videomanager.service

import org.sejapoe.videomanager.exception.auth.EmailAlreadyExitsRegistrationException
import org.sejapoe.videomanager.exception.auth.EmailDoesntExistsLoginException
import org.sejapoe.videomanager.model.Role
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.repo.UserRepo
import org.sejapoe.videomanager.security.JwtService
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepo: UserRepo,
    private val jwtService: JwtService,
    private val authenticationManager: AuthenticationManager,
    private val passwordEncoder: PasswordEncoder
) {

    fun register(email: String, password: String, fullName: String): Pair<String, User> {
        if (userRepo.findByEmail(email) != null) {
            throw EmailAlreadyExitsRegistrationException()
        }

        val user = User(email, passwordEncoder.encode(password), fullName, Role.ROLE_USER)
        userRepo.save(user)
        return jwtService.generateToken(user) to user
    }

    fun login(email: String, password: String): Pair<String, User> {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(email, password)
        )

        val user = userRepo.findByEmail(email) ?: throw EmailDoesntExistsLoginException()

        return jwtService.generateToken(user) to user
    }
}