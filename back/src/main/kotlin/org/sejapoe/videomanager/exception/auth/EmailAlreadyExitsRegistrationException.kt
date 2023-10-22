package org.sejapoe.videomanager.exception.auth

import org.sejapoe.videomanager.exception.BaseException
import org.springframework.http.HttpStatus

class EmailAlreadyExitsRegistrationException : BaseException(HttpStatus.CONFLICT, "Email already exists")
