package org.sejapoe.videomanager.exception

import org.springframework.http.HttpStatus

class ForbiddenException(message: String) : BaseException(HttpStatus.FORBIDDEN, message)
