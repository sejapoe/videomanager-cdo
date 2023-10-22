package org.sejapoe.videomanager.exception.auth

import org.sejapoe.videomanager.exception.BaseException
import org.springframework.http.HttpStatus

class EmailDoesntExistsLoginException : BaseException(HttpStatus.NOT_FOUND, "Email doesn't exists")
