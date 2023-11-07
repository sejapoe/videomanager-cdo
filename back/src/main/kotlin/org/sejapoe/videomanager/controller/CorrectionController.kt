package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.correction.CreateCorrectionReq
import org.sejapoe.videomanager.mapper.CorrectionMapper
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.security.annotations.IsUser
import org.sejapoe.videomanager.service.CorrectionService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/corrections")
class CorrectionController(
    private val correctionService: CorrectionService,
    private val correctionMapper: CorrectionMapper
) {
    @IsUser
    @PostMapping
    fun createCorrection(
        @RequestBody @Valid createCorrectionReq: CreateCorrectionReq,
        @AuthenticationPrincipal user: User
    ) =
        correctionService.createCorrection(createCorrectionReq, user).let(correctionMapper::toCorrectionRes)
}