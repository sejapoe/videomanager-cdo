package org.sejapoe.videomanager.exception.handler

import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.sejapoe.videomanager.exception.BaseException
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class ExceptionHandlerFilter : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            filterChain.doFilter(request, response)
        } catch (e: BaseException) {
            val problemDetail = e.toProblemDetail()

            response.status = problemDetail.status
            response.writer.write(
                ObjectMapper().writeValueAsString(problemDetail)
            )
        } catch (e: RuntimeException) {
            response.status = 500
        }
    }
}