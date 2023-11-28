package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.UserActivation
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor
import java.util.*

interface UserActivationRepo : JpaRepository<UserActivation, Long>, QuerydslPredicateExecutor<UserActivation> {
    fun findByUuid(uuid: UUID): UserActivation?
}