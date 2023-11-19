package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.correction.CreateCorrectionReq
import org.sejapoe.videomanager.dto.correction.UpdateCorrectionStatusReq
import org.sejapoe.videomanager.mapper.CorrectionMapper
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.security.annotations.IsUser
import org.sejapoe.videomanager.service.CorrectionService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/corrections")
class CorrectionController(
    private val correctionService: CorrectionService,
    private val correctionMapper: CorrectionMapper
) {
    @IsUser
    @GetMapping("/{id}")
    fun getCorrection(@PathVariable("id") id: Long, @AuthenticationPrincipal user: User) =
        correctionService.get(id, user).let(correctionMapper::toCorrectionRes)

    @IsUser
    @PostMapping
    fun createCorrection(
        @RequestBody @Valid createCorrectionReq: CreateCorrectionReq,
        @AuthenticationPrincipal user: User
    ) =
        correctionService.createCorrection(createCorrectionReq, user).let(correctionMapper::toCorrectionRes)

    @IsUser
    @PatchMapping
    fun updateCorrectionStatus(
        @RequestBody @Valid updateCorrectionStatusReq: UpdateCorrectionStatusReq,
        @AuthenticationPrincipal user: User
    ) =
        correctionService.updateStatus(updateCorrectionStatusReq.id, updateCorrectionStatusReq.isClosed, user)
            .let(correctionMapper::toCorrectionRes)
}