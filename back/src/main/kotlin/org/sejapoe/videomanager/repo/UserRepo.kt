package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.Role
import org.sejapoe.videomanager.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor

interface UserRepo : JpaRepository<User, Long>, QuerydslPredicateExecutor<User> {
    fun findByEmail(email: String): User?
    fun findByRoleAndEnabled(roleUser: Role, enabled: Boolean): List<User>
    fun findByRole(roleUser: Role): List<User>
}
