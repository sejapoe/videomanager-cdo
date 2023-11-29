package org.sejapoe.videomanager.service

import org.sejapoe.videomanager.exception.ConflictException
import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.model.Department
import org.sejapoe.videomanager.model.QArchiveEntry
import org.sejapoe.videomanager.model.QRequest
import org.sejapoe.videomanager.repo.ArchiveEntryRepo
import org.sejapoe.videomanager.repo.DepartmentRepo
import org.sejapoe.videomanager.repo.RequestRepo
import org.springframework.stereotype.Service

@Service
class DepartmentService(
    private val instituteService: InstituteService, private val departmentRepo: DepartmentRepo,
    private val requestRepo: RequestRepo, private val archiveEntryRepo: ArchiveEntryRepo
) {
    fun getAll(): List<Department> = departmentRepo.findAll()

    fun create(name: String, instituteId: Long): Department {
        val department = Department(name, instituteService.get(instituteId))

        checkDuplicate(department, name)

        return departmentRepo.save(department)
    }

    fun get(id: Long): Department =
        departmentRepo.findById(id).orElseThrow { NotFoundException("Department with $id is not found") }

    fun delete(id: Long, replacementId: Long?) {
        val department = get(id)
        val replacementDepartment = replacementId?.let(::get)

        val linkedRequests = requestRepo.findAll(QRequest.request.department.id.eq(id))
        val linkedArchiveEntries = archiveEntryRepo.findAll(QArchiveEntry.archiveEntry.department.id.eq(id))

        if (linkedRequests.any() || linkedArchiveEntries.any()) {
            if (replacementDepartment == null) {
                throw ConflictException("Cascade error while trying delete department")
            }

            linkedRequests.forEach {
                it.department = replacementDepartment
                it.institute = replacementDepartment.institute
            }

            linkedArchiveEntries.forEach {
                it.department = replacementDepartment
                it.institute = replacementDepartment.institute
            }
        }

        departmentRepo.delete(department)
    }

    fun rename(id: Long, name: String): Department {
        val department = get(id)

        checkDuplicate(department, name)

        department.name = name
        return departmentRepo.save(department)
    }

    private fun checkDuplicate(department: Department, name: String) {
        val isDuplicate = department.institute.departments.any { it.name == name && it.id != department.id }
        if (isDuplicate) {
            throw ConflictException("Department with name `${name}` already exists in institute `${department.institute.name}`")
        }
    }
}