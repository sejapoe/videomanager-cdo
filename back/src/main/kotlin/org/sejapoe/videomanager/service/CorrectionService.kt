package org.sejapoe.videomanager.service

import org.sejapoe.videomanager.dto.correction.CreateCorrectionReq
import org.sejapoe.videomanager.exception.ForbiddenException
import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.model.*
import org.sejapoe.videomanager.repo.CorrectionRepo
import org.sejapoe.videomanager.repo.RequestRepo
import org.springframework.stereotype.Service
import java.time.Instant
import kotlin.jvm.optionals.getOrNull

@Service
class CorrectionService(
    private val correctionRepo: CorrectionRepo,
    private val requestRepo: RequestRepo,
    private val lastViewService: LastViewService,
) {
    fun get(id: Long) =
        correctionRepo.findById(id).getOrNull() ?: throw NotFoundException("Исправление с ID $id не найдено")

    fun get(
        id: Long,
        requester: User,
    ): Correction {
        val correction = get(id)

        if (requester.role === Role.ROLE_USER && correction.request.lecturer.id != requester.id) {
            throw ForbiddenException("У вас нет доступа!")
        }

        return correction
    }

    fun createCorrection(
        createCorrectionReq: CreateCorrectionReq,
        user: User,
    ): Correction {
        val request =
            requestRepo.findById(createCorrectionReq.requestId).getOrNull()
                ?: throw NotFoundException("Request with id ${createCorrectionReq.requestId} is not found")

        if (request.lecturer.id != user.id) throw ForbiddenException("У вас нет доступа!")
        if (request.status != RequestStatus.CREATED && request.status != RequestStatus.WIP) {
            throw ForbiddenException("Запрос нельзя редактировать")
        }

        val correction =
            Correction(
                createCorrectionReq.startTimeCode,
                createCorrectionReq.endTimeCode,
                request,
            )

        val comment =
            Comment(
                Instant.now(),
                user,
                correction,
                createCorrectionReq.comment,
            )

        correction.comments = listOf(comment)
        correction.request.status = RequestStatus.WIP

        val saved = correctionRepo.save(correction)
        lastViewService.view(user, saved)
        return saved
    }

    fun updateStatus(
        id: Long,
        closed: Boolean,
        requester: User,
    ): Correction {
        val correction = get(id, requester)
        correction.closed = closed
        return correctionRepo.save(correction)
    }
}
