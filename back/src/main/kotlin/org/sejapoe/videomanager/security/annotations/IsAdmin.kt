package org.sejapoe.videomanager.security.annotations

import org.springframework.security.access.prepost.PreAuthorize

@Target(AnnotationTarget.FUNCTION, AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
annotation class IsAdmin
