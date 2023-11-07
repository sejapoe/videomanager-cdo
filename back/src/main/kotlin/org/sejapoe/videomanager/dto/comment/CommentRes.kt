package org.sejapoe.videomanager.dto.comment

import org.sejapoe.videomanager.dto.user.UserRes
import java.time.Instant

data class CommentRes(
    val timestamp: Instant,
    val author: UserRes,
    val text: String,
    val id: Long
)