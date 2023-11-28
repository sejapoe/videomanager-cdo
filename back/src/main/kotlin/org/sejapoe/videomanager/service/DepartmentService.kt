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

    fun create(name: String, instituteId: Long) =
        departmentRepo.save(Department(name, instituteService.get(instituteId)))

    fun get(id: Long): Department =
        departmentRepo.findById(id).orElseThrow { NotFoundException("Department with $id is not found") }

    fun delete(id: Long, replacementId: Long?) {
        val department = get(id)
        val replacementDepartment = replacementId?.let(::get)

        val linkedRequests = requestRepo.findAll(QRequest.request.department.id.eq(id))
        val linkedArchiveEntries = archiveEntryRepo.findAll(QArchiveEntry.archiveEntry.department.id.eq(id))

        if (linkedRequests.any() && linkedArchiveEntries.any()) {
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
}