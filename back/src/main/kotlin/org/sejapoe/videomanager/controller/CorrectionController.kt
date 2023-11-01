package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.correction.CreateCorrectionReq
import org.sejapoe.videomanager.dto.correction.UpdateCorrectionReq
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
    @PatchMapping("/{id}")
    fun updateComment(
        @PathVariable("id") id: Long,
        @RequestBody updateCorrectionReq: UpdateCorrectionReq,
        @AuthenticationPrincipal user: User
    ) =
        correctionService.updateComment(user, id, updateCorrectionReq.comment).let(correctionMapper::toCorrectionRes)

    @IsUser
    @PostMapping
    fun createCorrection(
        @RequestBody @Valid createCorrectionReq: CreateCorrectionReq,
        @AuthenticationPrincipal user: User
    ) =
        correctionService.createCorrection(createCorrectionReq, user).let(correctionMapper::toCorrectionRes)
}