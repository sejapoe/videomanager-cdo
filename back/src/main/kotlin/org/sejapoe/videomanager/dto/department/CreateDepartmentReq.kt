package org.sejapoe.videomanager.dto.department

import com.fasterxml.jackson.annotation.JsonProperty

data class CreateDepartmentReq(
    val name: String,
    @JsonProperty("institute_id")
    val instituteId: Long,
)
