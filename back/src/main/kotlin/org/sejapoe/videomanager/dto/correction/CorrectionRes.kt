package org.sejapoe.videomanager.dto.correction

data class CorrectionRes(
    val startTimeCode: Int,
    val endTimeCode: Int,
    val closed: Boolean,
    val id: Long,
    val isUnread: Boolean = false,
)
