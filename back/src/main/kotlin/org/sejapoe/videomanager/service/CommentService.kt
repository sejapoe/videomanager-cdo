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
    private val commentRepo: CommentRepo,
    private val lastViewService: LastViewService,
) {
    fun createComment(
        text: String,
        correctionId: Long,
        author: User,
    ): Comment {
        val correction = correctionService.get(correctionId)

        if (author.role == Role.ROLE_USER && correction.request.lecturer.id != author.id) {
            throw ForbiddenException("У вас нет доступа!")
        }

        val comment =
            Comment(
                text = text,
                author = author,
                correction = correction,
                timestamp = Instant.now(),
            )
        val saved = commentRepo.save(comment)
        lastViewService.view(author, correction)
        return saved
    }

    fun getAll(
        correctionId: Long,
        requester: User,
    ): List<Comment> {
        val correction = correctionService.get(correctionId)

        if (requester.role == Role.ROLE_USER && correction.request.lecturer.id != requester.id) {
            throw ForbiddenException("У вас нет доступа!")
        }

        return correction.comments.sortedBy { it.timestamp }
    }
}
