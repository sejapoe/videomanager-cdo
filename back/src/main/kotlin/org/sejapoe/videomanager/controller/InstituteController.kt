package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.institute.CreateInstituteReq
import org.sejapoe.videomanager.mapper.InstituteMapper
import org.sejapoe.videomanager.security.annotations.IsAdmin
import org.sejapoe.videomanager.security.annotations.IsUser
import org.sejapoe.videomanager.service.InstituteService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/institutes")
class InstituteController(
    private val instituteService: InstituteService,
    private val instituteMapper: InstituteMapper,
) {
    @GetMapping
    @IsUser
    fun getAllInstitutes() =
        instituteService.getAll().map(instituteMapper::toInstituteRes)


    @PostMapping
    @IsAdmin
    fun createInstitute(@RequestBody @Valid createInstituteReq: CreateInstituteReq) =
        instituteService.create(createInstituteReq.name).let(instituteMapper::toInstituteRes)
}