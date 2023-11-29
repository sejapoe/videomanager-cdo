package org.sejapoe.videomanager.dto.institute

data class DeleteInstituteReq(
    val id: Long,
    val departmentReplacement: Map<Long, Long>?,
)
