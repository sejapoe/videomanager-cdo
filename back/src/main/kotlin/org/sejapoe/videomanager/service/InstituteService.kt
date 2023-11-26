package org.sejapoe.videomanager.service

import jakarta.transaction.Transactional
import org.sejapoe.videomanager.dto.institute.CreateInstituteWithDepartments
import org.sejapoe.videomanager.exception.InstituteNotFoundException
import org.sejapoe.videomanager.model.Department
import org.sejapoe.videomanager.model.Institute
import org.sejapoe.videomanager.repo.DepartmentRepo
import org.sejapoe.videomanager.repo.InstituteRepo
import org.springframework.stereotype.Service

@Service
class InstituteService(
    private val instituteRepo: InstituteRepo, private val departmentRepo: DepartmentRepo
) {
    fun getAll(): List<Institute> = instituteRepo.findAll()

    fun create(name: String) = instituteRepo.save(Institute(name))
    fun get(id: Long): Institute = instituteRepo.findById(id).orElseThrow { InstituteNotFoundException(id) }

    @Transactional
    fun create(names: List<CreateInstituteWithDepartments>): List<Institute> {
        val institutes = names.map {
            Institute(
                it.name,
            ).apply {
                this.departments = it.departments.map { name ->
                    Department(name, this)
                }.toSet()
            }
        }

        return instituteRepo.saveAll(institutes)
    }
}