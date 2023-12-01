package org.sejapoe.videomanager.security

import org.sejapoe.videomanager.exception.ForbiddenException
import org.sejapoe.videomanager.model.User
import org.springframework.security.core.context.SecurityContextHolder

val currentUser: User
    get() = SecurityContextHolder.getContext().authentication.principal as User?
        ?: throw ForbiddenException("Unauthorized")