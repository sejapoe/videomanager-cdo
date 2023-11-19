package org.sejapoe.videomanager.service

import org.sejapoe.videomanager.dto.correction.CreateCorrectionReq
import org.sejapoe.videomanager.exception.ForbiddenException
import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.model.Comment
import org.sejapoe.videomanager.model.Correction
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.repo.CommentRepo
import org.sejapoe.videomanager.repo.CorrectionRepo
import org.sejapoe.videomanager.repo.RequestRepo
import org.springframework.stereotype.Service
import java.time.Instant
import kotlin.jvm.optionals.getOrNull

@Service
class CorrectionService(
    private val correctionRepo: CorrectionRepo,
    private val requestRepo: RequestRepo,
    private val commentRepo: CommentRepo
) {
    fun get(id: Long) =
        correctionRepo.findById(id).getOrNull() ?: throw NotFoundException("Correction with id $id is not found")

    fun get(id: Long, requester: User): Correction {
        val correction = get(id)

        if (correction.request.lecturer.id != requester.id)
            throw ForbiddenException("You can't access other user's requests!")

        return correction
    }

    fun createCorrection(createCorrectionReq: CreateCorrectionReq, user: User): Correction {
        val request = requestRepo.findById(createCorrectionReq.requestId).getOrNull()
            ?: throw NotFoundException("Request with id ${createCorrectionReq.requestId} is not found")

        if (request.lecturer.id != user.id) throw ForbiddenException("You have no access!")

        val correction = Correction(
            createCorrectionReq.startTimeCode,
            createCorrectionReq.endTimeCode,
            request,
        )

        val comment = Comment(
            Instant.now(),
            user,
            correction,
            createCorrectionReq.comment,
        )

//        commentRepo.save(comment)
        correction.comments = listOf(comment)

        return correctionRepo.save(correction)
    }

    fun updateStatus(id: Long, closed: Boolean, requester: User): Correction {
        val correction = get(id, requester)
        correction.closed = closed
        return correctionRepo.save(correction)
    }
}