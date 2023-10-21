package org.sejapoe.videomanager.exception.handler

import org.sejapoe.videomanager.exception.BaseException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class AppExceptionHandler : ResponseEntityExceptionHandler() {
    @ExceptionHandler(BaseException::class)
    fun handleHttpClientErrorException(exception: BaseException) =
        exception.toProblemDetail()
}