package org.sejapoe.videomanager.dto.department

import jakarta.validation.constraints.NotBlank

data class RenameDepartmentReq(
    val id: Long,
    @NotBlank val name: String
)
