package org.sejapoe.videomanager.dto.user

import org.sejapoe.videomanager.model.Role

data class UserRes(
    val id: Long,
    val email: String,
    val fullName: String,
    val role: Role,
    val enabled: Boolean
)
