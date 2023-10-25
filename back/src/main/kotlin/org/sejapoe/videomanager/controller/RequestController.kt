package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.request.CreateRequestReq
import org.sejapoe.videomanager.mapper.RequestMapper
import org.sejapoe.videomanager.security.annotations.IsAdmin
import org.sejapoe.videomanager.service.RequestService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
class RequestController(
    private val requestService: RequestService,
    private val requestMapper: RequestMapper
) {
    @IsAdmin
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/api/requests")
    fun createRequest(@RequestBody @Valid createRequestReq: CreateRequestReq) =
        requestService.create(
            createRequestReq.name,
            createRequestReq.lecturerId,
            createRequestReq.instituteId,
            createRequestReq.departmentId,
            createRequestReq.linkToMoodle
        ).let(requestMapper::toRequestRes)

    @IsAdmin
    @GetMapping
    @PostMapping("/api/requests")
    fun getRequests() = requestService.getAll().map(requestMapper::toRequestRes)
}