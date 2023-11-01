package org.sejapoe.videomanager.controller

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.request.CreateRequestReq
import org.sejapoe.videomanager.dto.request.FilterRequestReq
import org.sejapoe.videomanager.mapper.RequestMapper
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.security.annotations.IsAdmin
import org.sejapoe.videomanager.security.annotations.IsUser
import org.sejapoe.videomanager.service.RequestService
import org.springdoc.core.annotations.ParameterObject
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/requests")
class RequestController(
    private val requestService: RequestService,
    private val requestMapper: RequestMapper
) {
    @IsAdmin
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    fun createRequest(@RequestBody @Valid createRequestReq: CreateRequestReq) =
        requestService.create(
            createRequestReq.name,
            createRequestReq.lecturerId,
            createRequestReq.instituteId,
            createRequestReq.departmentId,
            createRequestReq.linkToMoodle
        ).let(requestMapper::toRequestRes)

    @IsUser
    @GetMapping
    fun getRequests(
        @ParameterObject @Schema filterRequestReq: FilterRequestReq,
        @AuthenticationPrincipal user: User
    ) =
        requestService.getAll(
            user,
            filterRequestReq.user,
            filterRequestReq.toPredicate(),
            filterRequestReq.toPageable()
        )
            .map(requestMapper::toRequestRes)


    @IsUser
    @GetMapping("/{id}")
    fun getRequest(@PathVariable("id") @Valid id: Long, @AuthenticationPrincipal user: User) =
        requestService.get(user, id).let(requestMapper::toFullRequestRes).run {
            copy(corrections = corrections.sortedBy { it.id })
        }
}