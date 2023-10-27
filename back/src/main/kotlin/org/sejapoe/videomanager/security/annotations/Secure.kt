package org.sejapoe.videomanager.security.annotations

import io.swagger.v3.oas.annotations.security.SecurityRequirement

@Target(AnnotationTarget.FUNCTION, AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@SecurityRequirement(name = "bearerToken")
annotation class Secure
