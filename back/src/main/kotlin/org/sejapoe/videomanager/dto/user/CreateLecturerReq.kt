package org.sejapoe.videomanager.dto.user

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class CreateLecturerReq(
    @NotBlank
    val name: String,
    @NotBlank
    @Email
    val email: String,
)
