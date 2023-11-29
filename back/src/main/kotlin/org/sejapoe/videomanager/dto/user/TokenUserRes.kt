package org.sejapoe.videomanager.dto.user

import org.sejapoe.videomanager.model.Role

data class TokenUserRes(
    val id: Long,
    val email: String,
    val fullName: String,
    val role: Role,
    val token: String,
)
