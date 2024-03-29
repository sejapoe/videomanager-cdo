package org.sejapoe.videomanager.service

import com.querydsl.core.types.Predicate
import org.sejapoe.videomanager.exception.ConflictException
import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.model.QUser
import org.sejapoe.videomanager.model.Role
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.model.UserActivation
import org.sejapoe.videomanager.repo.UserActivationRepo
import org.sejapoe.videomanager.repo.UserRepo
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(
    private val userRepo: UserRepo,
    private val userActivationRepo: UserActivationRepo,
    private val emailService: EmailService,
) {
    fun createLecturer(
        name: String,
        email: String,
    ): User {
        val user = User(email, "", name, Role.ROLE_USER, false)

        if (userRepo.findByEmail(user.email) != null) {
            throw ConflictException("Пользователь с таким Email уже существует")
        }

        val activator = UserActivation(UUID.randomUUID(), user)
        userActivationRepo.save(activator)
        return user
    }

    fun createAdmin(
        name: String,
        email: String,
    ) {
        if (userRepo.exists(QUser.user.role.eq(Role.ROLE_ADMIN))) return // Admin already exists
        val user = User(email, "", name, Role.ROLE_ADMIN, false)
        val activator = UserActivation(UUID.randomUUID(), user)
        userActivationRepo.save(activator)
    }

    fun getLecturers(
        predicate: Predicate,
        pageable: Pageable,
    ): Page<User> {
        return userRepo.findAll(QUser.user.role.eq(Role.ROLE_USER).and(predicate), pageable)
    }

    fun get(id: Long): User = userRepo.findById(id).orElseThrow { NotFoundException("Пользователь с ID $id не найден") }

    fun renameLecturer(id: Long, name: String): User {
        val user = get(id)
        user.fullName = name
        return userRepo.save(user)
    }

    fun resetPassword(id: Long) {
        val user = get(id)

        if (!user.enabled) {
            throw ConflictException("Пользователь \"${user.fullName}\" неактивен")
        }

        user.enabled = false
        user.password = ""

        val activator = UserActivation(UUID.randomUUID(), user)
        userActivationRepo.save(activator)

        emailService.notifyPasswordReset(user)
    }
}
