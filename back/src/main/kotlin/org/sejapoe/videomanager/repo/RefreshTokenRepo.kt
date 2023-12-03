package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.RefreshToken
import org.springframework.data.jpa.repository.JpaRepository

interface RefreshTokenRepo : JpaRepository<RefreshToken, Long> {
    fun findByToken(token: String): RefreshToken?
}