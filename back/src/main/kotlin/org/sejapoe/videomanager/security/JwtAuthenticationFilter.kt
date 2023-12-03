package org.sejapoe.videomanager.security

import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.JwtException
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.sejapoe.videomanager.exception.ForbiddenException
import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter(
    private val jwtService: JwtService,
    private val userDetailsService: UserDetailsService,
) : OncePerRequestFilter() {
    private val authHeaderPrefix = "Bearer "

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        val log = LoggerFactory.getLogger(JwtAuthenticationFilter::class.java.name)

        val authHeader = request.getHeader(HttpHeaders.AUTHORIZATION)

        if (authHeader == null || !authHeader.startsWith(authHeaderPrefix)) {
            log.info("No auth header provided for request")
            return filterChain.doFilter(request, response)
        }

        val token = authHeader.drop(authHeaderPrefix.length)
        val username =
            try {
                jwtService.extractUsername(token)
            } catch (e: ExpiredJwtException) {
                throw ForbiddenException("Token expired")
            } catch (e: JwtException) {
                return filterChain.doFilter(request, response)
            }

        if (SecurityContextHolder.getContext().authentication == null) {
            val userDetails = userDetailsService.loadUserByUsername(username)
            if (jwtService.validateToken(token, userDetails)) {
                val authentication = UsernamePasswordAuthenticationToken(userDetails, null, userDetails.authorities)
                authentication.details = WebAuthenticationDetailsSource().buildDetails(request)
                SecurityContextHolder.getContext().authentication = authentication
            } else if (jwtService.isTokenExpired(token)) {
                throw ForbiddenException("Token expired")
            }
        }
        filterChain.doFilter(request, response)
    }
}
