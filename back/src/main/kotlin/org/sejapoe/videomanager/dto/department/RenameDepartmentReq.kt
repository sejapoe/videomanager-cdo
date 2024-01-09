package org.sejapoe.videomanager.dto.department

import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.validation.constraints.NotBlank

data class RenameDepartmentReq(
    val id: Long,
    @NotBlank val name: String,
    @JsonProperty("short_name")
    val shortName: String?,
)
