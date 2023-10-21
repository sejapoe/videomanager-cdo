package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepo : JpaRepository<User, Long> {
    fun findByEmail(email: String): User?
}
