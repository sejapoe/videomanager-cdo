package org.sejapoe.videomanager.dto.user

data class TokenUserRes(
    val userInfo: UserRes,
    val accessToken: String,
    val refreshToken: String,
)
