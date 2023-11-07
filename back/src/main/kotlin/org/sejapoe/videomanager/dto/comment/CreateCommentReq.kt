package org.sejapoe.videomanager.dto.comment

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Positive

data class CreateCommentReq(
    @NotBlank
    val text: String,
    @Positive
    val correctionId: Long
)