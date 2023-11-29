package org.sejapoe.videomanager.dto.correction

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Positive
import jakarta.validation.constraints.PositiveOrZero

data class CreateCorrectionReq(
    @Positive val requestId: Long,
    @NotBlank val comment: String,
    @PositiveOrZero val startTimeCode: Int,
    @Positive val endTimeCode: Int,
)
