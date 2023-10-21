package org.sejapoe.videomanager.dto.user

import com.fasterxml.jackson.annotation.JsonProperty

data class RegisterReq(
    @JsonProperty("full_name")
    val fullName: String,
    val email: String,
    val password: String
)