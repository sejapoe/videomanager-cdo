package org.sejapoe.videomanager.exception

import org.springframework.http.HttpStatus

class ConflictException(message: String) : BaseException(HttpStatus.CONFLICT, message)