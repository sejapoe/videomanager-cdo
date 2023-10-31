package org.sejapoe.videomanager.controller

import org.sejapoe.videomanager.dto.correction.EditCorrectionReq
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.security.annotations.IsAdmin
import org.sejapoe.videomanager.security.annotations.IsUser
import org.sejapoe.videomanager.service.CorrectionService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/corrections")
class CorrectionController(private val correctionService: CorrectionService) {
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
}