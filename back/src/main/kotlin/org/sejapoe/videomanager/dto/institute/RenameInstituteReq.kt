package org.sejapoe.videomanager.dto.institute

import jakarta.validation.constraints.NotBlank

data class RenameInstituteReq(
    val id: Long,
    @NotBlank
    val name: String,
)
