package org.sejapoe.videomanager.service

import org.sejapoe.videomanager.dto.correction.CreateCorrectionReq
import org.sejapoe.videomanager.exception.ForbiddenException
import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.model.Correction
import org.sejapoe.videomanager.model.Role
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.repo.CorrectionRepo
import org.sejapoe.videomanager.repo.RequestRepo
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class CorrectionService(
    private val correctionRepo: CorrectionRepo,
    private val requestRepo: RequestRepo
) {
    fun updateUserComment(requester: User, id: Long, newComment: String): Correction {
        val correction =
            correctionRepo.findById(id).getOrNull() ?: throw NotFoundException("Correction with id $id is not found")
        if (correction.request.lecturer.id != requester.id) throw ForbiddenException("You have no access!")
        correction.comment = newComment
        return correctionRepo.save(correction)
    }

    fun updateAdminComment(requester: User, id: Long, newComment: String): Correction {
        val correction =
            correctionRepo.findById(id).getOrNull() ?: throw NotFoundException("Correction with id $id is not found")
        correction.adminComment = newComment
        return correctionRepo.save(correction)
    }

    fun createCorrection(createCorrectionReq: CreateCorrectionReq, user: User): Correction {
        val request = requestRepo.findById(createCorrectionReq.requestId).getOrNull()
            ?: throw NotFoundException("Request with id ${createCorrectionReq.requestId} is not found")

        if (request.lecturer.id != user.id) throw ForbiddenException("You have no access!")

        val correction = Correction(
            createCorrectionReq.startTimeCode,
            createCorrectionReq.endTimeCode,
            createCorrectionReq.comment,
            "",
            "",
            request
        )
        return correctionRepo.save(correction)
    }

    fun updateComment(requester: User, id: Long, comment: String) = when (requester.role) {
        Role.ROLE_USER -> updateUserComment(requester, id, comment)
        Role.ROLE_ADMIN -> updateAdminComment(requester, id, comment)
    }
}