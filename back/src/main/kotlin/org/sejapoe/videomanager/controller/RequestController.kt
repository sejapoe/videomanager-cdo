package org.sejapoe.videomanager.controller

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.correction.CorrectionRes
import org.sejapoe.videomanager.dto.request.CreateRequestReq
import org.sejapoe.videomanager.dto.request.FilterRequestReq
import org.sejapoe.videomanager.dto.request.UpdateRequestStatusReq
import org.sejapoe.videomanager.mapper.ArchiveEntryMapper
import org.sejapoe.videomanager.mapper.RequestMapper
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.security.annotations.IsAdmin
import org.sejapoe.videomanager.security.annotations.IsUser
import org.sejapoe.videomanager.service.LastViewService
import org.sejapoe.videomanager.service.RequestService
import org.springdoc.core.annotations.ParameterObject
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/requests")
class RequestController(
    private val requestService: RequestService,
    private val requestMapper: RequestMapper,
    private val lastViewService: LastViewService,
    private val archiveEntryMapper: ArchiveEntryMapper,
) {
    @IsAdmin
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    fun createRequest(
        @RequestBody @Valid createRequestReq: CreateRequestReq,
    ) = requestService.create(
        createRequestReq.name,
        createRequestReq.lecturerId,
        createRequestReq.instituteId,
        createRequestReq.departmentId,
        createRequestReq.linkToMoodle,
        createRequestReq.linkToVideo,
    ).let(requestMapper::toRequestRes)

    @IsUser
    @GetMapping
    fun getRequests(
        @ParameterObject @Schema filterRequestReq: FilterRequestReq,
        @AuthenticationPrincipal user: User,
    ) = requestService.getAll(
        user,
        filterRequestReq.user ?: emptyList(),
        filterRequestReq.toPredicate(),
        filterRequestReq.toPageable(),
    )
        .map {
            requestMapper.toRequestRes(it).copy(
                unreadCount = lastViewService.countUnread(user, it),
            )
        }

    @IsUser
    @GetMapping("/{id}")
    fun getRequest(
        @PathVariable("id") @Valid id: Long,
        @AuthenticationPrincipal user: User,
    ) = requestService.get(user, id).let(requestMapper::toFullRequestRes).run {
        copy(
            corrections =
            corrections.sortedWith(
                Comparator.comparing(CorrectionRes::startTimeCode).thenComparing(CorrectionRes::endTimeCode),
            ),
        )
    }

    @IsUser
    @PutMapping
    fun updateRequestStatus(
        @RequestBody @Valid updateRequestStatusReq: UpdateRequestStatusReq,
        @AuthenticationPrincipal user: User,
    ) = requestService.updateStatus(updateRequestStatusReq.id, updateRequestStatusReq.newStatus, user)
        .let(requestMapper::toFullRequestRes).run {
            copy(
                corrections =
                corrections.sortedWith(
                    Comparator.comparing(CorrectionRes::startTimeCode).thenComparing(CorrectionRes::endTimeCode),
                ),
            )
        }

    @IsAdmin
    @PostMapping("/{id}/archive")
    fun archiveRequest(
        @PathVariable id: Long,
        @AuthenticationPrincipal user: User,
    ) = requestService.archive(id, user).let(archiveEntryMapper::toDto)
}
