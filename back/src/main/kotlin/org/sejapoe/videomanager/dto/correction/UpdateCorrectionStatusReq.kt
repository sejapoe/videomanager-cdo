package org.sejapoe.videomanager.dto.correction

data class UpdateCorrectionStatusReq(
    val id: Long,
    val isClosed: Boolean
)
