package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.institute.CreateInstituteReq
import org.sejapoe.videomanager.dto.institute.CreateInstitutesWithDepartmentsReq
import org.sejapoe.videomanager.dto.institute.DeleteInstituteReq
import org.sejapoe.videomanager.exception.InstituteDeletionCascadeException
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
    @IsUser
    @GetMapping
    fun getAllInstitutes() =
        instituteService.getAll().map(instituteMapper::toInstituteWithDepartmentsRes)


    @IsAdmin
    @PostMapping
    fun createInstitute(@RequestBody @Valid createInstituteReq: CreateInstituteReq) =
        instituteService.create(createInstituteReq.name).let(instituteMapper::toInstituteWithDepartmentsRes)

    @IsAdmin
    @PostMapping("/with_departments")
    fun createInstitutes(@RequestBody @Valid createInstitutesReq: CreateInstitutesWithDepartmentsReq) =
        instituteService.create(createInstitutesReq.institutes).map(instituteMapper::toInstituteWithDepartmentsRes)

    @IsAdmin
    @DeleteMapping
    fun deleteInstitute(@RequestBody @Valid deleteInstituteReq: DeleteInstituteReq) =
        instituteService.delete(deleteInstituteReq.id, deleteInstituteReq.departmentReplacement ?: mapOf())

    @ExceptionHandler(InstituteDeletionCascadeException::class)
    fun handleInstituteDeletionCascade(e: InstituteDeletionCascadeException) =
        e.toProblemDetail().apply {
            setProperty("departmentIds", e.departmentIds)
        }
}