package org.sejapoe.videomanager.security.annotations

import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.security.access.prepost.PreAuthorize

@Target(AnnotationTarget.FUNCTION, AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@SecurityRequirement(name = "bearerToken")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
annotation class IsAdmin
