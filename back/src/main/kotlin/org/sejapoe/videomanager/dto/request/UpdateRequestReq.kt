package org.sejapoe.videomanager.dto.request

import jakarta.validation.constraints.NotBlank
import java.io.Serializable

/**
 * DTO for {@link org.sejapoe.videomanager.model.Request}
 */
data class UpdateRequestReq(
    val id: Long,
    @field:NotBlank val name: String,
    @field:NotBlank val linkToMoodle: String,
    @field:NotBlank val linkToVideo: String
) : Serializable