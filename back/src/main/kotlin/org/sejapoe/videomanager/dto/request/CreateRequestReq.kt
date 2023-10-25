package org.sejapoe.videomanager.dto.request

import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Positive

data class CreateRequestReq(
    @NotBlank val name: String,
    @JsonProperty("lecturer_id") @Positive val lecturerId: Long,
    @JsonProperty("institute_id") @Positive val instituteId: Long,
    @JsonProperty("department_id") @Positive val departmentId: Long,
    @NotBlank val linkToMoodle: String,
)