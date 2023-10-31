package org.sejapoe.videomanager.dto.correction

data class CorrectionRes(
    val startTimeCode: Int,
    val endTimeCode: Int,
    val comment: String,
    val adminComment: String,
    val imgUrl: String,
    val id: Long,
)