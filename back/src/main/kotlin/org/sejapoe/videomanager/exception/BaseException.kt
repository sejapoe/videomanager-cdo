package org.sejapoe.videomanager.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail

open class BaseException(
    private val httpStatus: HttpStatus,
    private val detail: String,
) : Throwable("${httpStatus.value()}: $detail") {
    constructor(httpStatus: HttpStatus) : this(httpStatus, httpStatus.reasonPhrase)
    constructor(detail: String) : this(HttpStatus.INTERNAL_SERVER_ERROR, detail)

    fun toProblemDetail() = ProblemDetail.forStatusAndDetail(httpStatus, detail)
}
