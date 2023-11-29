package org.sejapoe.videomanager.exception

import org.springframework.http.HttpStatus

open class ConflictException(message: String) : BaseException(HttpStatus.CONFLICT, message)
