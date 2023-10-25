package org.sejapoe.videomanager.service

import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.model.Department
import org.sejapoe.videomanager.repo.DepartmentRepo
import org.springframework.stereotype.Service

@Service
class DepartmentService(private val instituteService: InstituteService, private val departmentRepo: DepartmentRepo) {
    fun getAll(): List<Department> = departmentRepo.findAll()

    fun create(name: String, instituteId: Long) =
        departmentRepo.save(Department(name, instituteService.get(instituteId)))

    fun get(id: Long): Department =
        departmentRepo.findById(id).orElseThrow { NotFoundException("Department with $id is not found") }
}