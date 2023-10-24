package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.UserActivation
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UserActivationRepo : JpaRepository<UserActivation, Long> {
    fun findByUuid(uuid: UUID): UserActivation?
}