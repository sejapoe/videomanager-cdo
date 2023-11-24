package org.sejapoe.videomanager.dto.archive

data class CreateArchiveEntryReq(
    val name: String,
    val lecturerId: Long,
    val instituteId: Long,
    val departmentId: Long,
    val linkToVideo: String,
    val linkToMoodle: String,
)
