package org.sejapoe.videomanager.mapper

import org.mapstruct.Mapper
import org.sejapoe.videomanager.dto.comment.CommentRes
import org.sejapoe.videomanager.model.Comment

@Mapper(componentModel = "spring", uses = [UserMapper::class])
interface CommentMapper {
    fun toCommentRes(comment: Comment): CommentRes
}
