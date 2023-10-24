package org.sejapoe.videomanager.exception

import org.springframework.http.HttpStatus

class UserActivationNotFoundException : BaseException(HttpStatus.NOT_FOUND, "No such user activation")
