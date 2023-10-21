package org.sejapoe.videomanager.exception

import org.springframework.http.HttpStatus

class EmailAlreadyExitsRegistrationException : BaseException(HttpStatus.CONFLICT, "Email already exists")
