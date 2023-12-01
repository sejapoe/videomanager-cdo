package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.correction.CreateCorrectionReq
import org.sejapoe.videomanager.dto.correction.UpdateCorrectionStatusReq
import org.sejapoe.videomanager.mapper.CorrectionMapper
import org.sejapoe.videomanager.security.annotations.IsUser
import org.sejapoe.videomanager.security.currentUser
import org.sejapoe.videomanager.service.CorrectionService
import org.sejapoe.videomanager.service.LastViewService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/corrections")
class CorrectionController(
    private val correctionService: CorrectionService,
    private val correctionMapper: CorrectionMapper,
    private val lastViewService: LastViewService,
) {
    @IsUser
    @GetMapping("/{id}")
    fun getCorrection(
        @PathVariable("id") id: Long,
    ) = correctionService.get(id, currentUser).let {
        correctionMapper.toCorrectionRes(it).copy(
            isUnread = lastViewService.isUnread(currentUser, it),
        )
    }

    @IsUser
    @PostMapping("/{id}/view")
    fun viewCorrection(
        @PathVariable("id") id: Long,
    ) = lastViewService.view(currentUser, correctionService.get(id, currentUser))

    @IsUser
    @PostMapping
    fun createCorrection(
        @RequestBody @Valid createCorrectionReq: CreateCorrectionReq,
    ) = correctionService.createCorrection(createCorrectionReq, currentUser).let(correctionMapper::toCorrectionRes)

    @IsUser
    @PatchMapping
    fun updateCorrectionStatus(
        @RequestBody @Valid updateCorrectionStatusReq: UpdateCorrectionStatusReq,
    ) = correctionService.updateStatus(
        updateCorrectionStatusReq.id,
        updateCorrectionStatusReq.isClosed,
        currentUser
    ).let(correctionMapper::toCorrectionRes)
}
