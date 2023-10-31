package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.correction.CreateCorrectionReq
import org.sejapoe.videomanager.dto.correction.EditCorrectionReq
import org.sejapoe.videomanager.mapper.CorrectionMapper
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.security.annotations.IsAdmin
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
    @PatchMapping("/{id}/user")
    fun editUserComment(
        @PathVariable("id") id: Long,
        @RequestBody editCorrectionReq: EditCorrectionReq,
        @AuthenticationPrincipal user: User
    ) =
        correctionService.updateUserComment(user, id, editCorrectionReq.comment)

    @IsAdmin
    @PatchMapping("/{id}/admin")
    fun editAdminComment(
        @PathVariable("id") id: Long,
        @RequestBody editCorrectionReq: EditCorrectionReq,
        @AuthenticationPrincipal user: User
    ) =
        correctionService.updateAdminComment(user, id, editCorrectionReq.comment)


    @IsUser
    @PostMapping
    fun createCorrection(
        @RequestBody @Valid createCorrectionReq: CreateCorrectionReq,
        @AuthenticationPrincipal user: User
    ) =
        correctionService.createCorrection(createCorrectionReq, user).let(correctionMapper::toCorrectionRes)
}