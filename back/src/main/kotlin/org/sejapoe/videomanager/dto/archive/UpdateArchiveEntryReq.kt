package org.sejapoe.videomanager.dto.archive

import jakarta.validation.constraints.NotBlank
import java.io.Serializable

data class UpdateArchiveEntryReq(
    val id: Long,
    @field:NotBlank val name: String,
    @field:NotBlank val linkToMoodle: String,
    @field:NotBlank val linkToVideo: String,
    @field:NotBlank val description: String?
) : Serializable