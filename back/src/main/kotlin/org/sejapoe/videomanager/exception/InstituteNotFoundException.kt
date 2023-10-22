package org.sejapoe.videomanager.exception

import org.springframework.http.HttpStatus

class InstituteNotFoundException(id: Long) : BaseException(HttpStatus.NOT_FOUND, "Institute with id $id is not found")