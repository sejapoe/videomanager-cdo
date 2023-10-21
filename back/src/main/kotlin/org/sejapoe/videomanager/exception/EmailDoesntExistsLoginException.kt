package org.sejapoe.videomanager.exception

import org.springframework.http.HttpStatus

class EmailDoesntExistsLoginException : BaseException(HttpStatus.NOT_FOUND, "Email doesn't exists")
