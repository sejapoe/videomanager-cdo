package org.sejapoe.videomanager.dto.user

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotBlank
import java.util.*

data class ActivateUserReq(
    val uuid: UUID,
    @NotBlank @Min(8)
    val password: String,
)
