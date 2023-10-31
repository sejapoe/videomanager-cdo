package org.sejapoe.videomanager.service

import org.sejapoe.videomanager.exception.ForbiddenException
import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.repo.CorrectionRepo
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class CorrectionService(
    private val correctionRepo: CorrectionRepo
) {
    fun updateUserComment(requester: User, id: Long, newComment: String) {
        val correction =
            correctionRepo.findById(id).getOrNull() ?: throw NotFoundException("Correction with id $id is not found")
        if (correction.request.lecturer.id != requester.id) throw ForbiddenException("You have no access!")
        correction.comment = newComment
        correctionRepo.save(correction)
    }

    fun updateAdminComment(requester: User, id: Long, newComment: String) {
        val correction =
            correctionRepo.findById(id).getOrNull() ?: throw NotFoundException("Correction with id $id is not found")
        correction.adminComment = newComment
        correctionRepo.save(correction)
    }
}