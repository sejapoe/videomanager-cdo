package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.department.CreateDepartmentReq
import org.sejapoe.videomanager.dto.department.DeleteDepartmentReq
import org.sejapoe.videomanager.dto.department.RenameDepartmentReq
import org.sejapoe.videomanager.mapper.DepartmentMapper
import org.sejapoe.videomanager.security.annotations.IsAdmin
import org.sejapoe.videomanager.security.annotations.IsUser
import org.sejapoe.videomanager.service.DepartmentService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/departments")
class DepartmentController(
    private val departmentService: DepartmentService,
    private val departmentMapper: DepartmentMapper
) {
    @IsUser
    @GetMapping
    fun getAllDepartments() = departmentService.getAll().map(departmentMapper::toDepartmentRes)

    @IsAdmin
    @PostMapping
    fun createDepartment(@RequestBody @Valid createDepartmentReq: CreateDepartmentReq) =
        departmentService.create(createDepartmentReq.name, createDepartmentReq.instituteId)
            .let(departmentMapper::toDepartmentRes)

    @IsAdmin
    @DeleteMapping
    fun deleteDepartment(@RequestBody @Valid deleteDepartmentReq: DeleteDepartmentReq) =
        departmentService.delete(deleteDepartmentReq.id, deleteDepartmentReq.replacementId)

    @IsAdmin
    @PatchMapping
    fun renameDepartment(@RequestBody @Valid renameDepartmentReq: RenameDepartmentReq) =
        departmentService.rename(renameDepartmentReq.id, renameDepartmentReq.name)

}