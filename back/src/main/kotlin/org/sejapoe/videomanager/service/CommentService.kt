package org.sejapoe.videomanager.service

import org.sejapoe.videomanager.exception.ForbiddenException
import org.sejapoe.videomanager.model.Comment
import org.sejapoe.videomanager.model.Role
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.repo.CommentRepo
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class CommentService(
    private val correctionService: CorrectionService,
    private val commentRepo: CommentRepo
) {
    fun createComment(text: String, correctionId: Long, author: User): Comment {
        val correction = correctionService.get(correctionId)

        if (author.role == Role.ROLE_USER && correction.request.lecturer.id != author.id)
            throw ForbiddenException("You have no access!")

        val comment = Comment(
            text = text,
            author = author,
            correction = correction,
            timestamp = Instant.now(),
        )
        return commentRepo.save(comment)
    }

    fun getAll(correctionId: Long, requester: User): List<Comment> {
        val correction = correctionService.get(correctionId)

        if (requester.role == Role.ROLE_USER && correction.request.lecturer.id != requester.id)
            throw ForbiddenException("You have no access!")

        return correction.comments
    }
}