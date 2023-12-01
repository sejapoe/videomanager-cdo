package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import jakarta.websocket.server.PathParam
import org.sejapoe.videomanager.dto.comment.CreateCommentReq
import org.sejapoe.videomanager.mapper.CommentMapper
import org.sejapoe.videomanager.security.annotations.IsUser
import org.sejapoe.videomanager.security.currentUser
import org.sejapoe.videomanager.service.CommentService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/comments")
class CommentController(
    private val commentService: CommentService,
    private val commentMapper: CommentMapper,
) {
    @IsUser
    @GetMapping
    fun getComments(
        @PathParam("correctionId") correctionId: Long,
    ) = commentService.getAll(correctionId, currentUser).map(commentMapper::toCommentRes)

    @IsUser
    @PostMapping
    fun createComment(
        @Valid @RequestBody createCommentReq: CreateCommentReq,
    ) = commentService.createComment(
        createCommentReq.text,
        createCommentReq.correctionId,
        currentUser,
    ).let(commentMapper::toCommentRes)
}
