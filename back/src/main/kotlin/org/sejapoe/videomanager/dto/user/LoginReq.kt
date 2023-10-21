package org.sejapoe.videomanager.dto.user

import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size


data class LoginReq(
    @NotNull(message = "can't be missing")
    @Size(min = 1, message = "can't be empty")
    @Pattern(
        regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$",
        message = "must be a valid email"
    )
    val email: String,
    @NotNull(message = "can't be missing")
    @Size(min = 8, message = "must be at least 8 symbols")
    val password: String
)
