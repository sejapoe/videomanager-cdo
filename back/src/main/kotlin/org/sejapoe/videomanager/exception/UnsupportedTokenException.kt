package org.sejapoe.videomanager.exception

import org.springframework.http.HttpStatus

class UnsupportedTokenException : BaseException(HttpStatus.FORBIDDEN, "Unsupported token")
