package org.sejapoe.videomanager.service

import jakarta.transaction.Transactional
import org.sejapoe.videomanager.dto.institute.CreateInstituteWithDepartments
import org.sejapoe.videomanager.exception.ConflictException
import org.sejapoe.videomanager.exception.InstituteDeletionCascadeException
import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.model.Department
import org.sejapoe.videomanager.model.Institute
import org.sejapoe.videomanager.model.QArchiveEntry
import org.sejapoe.videomanager.model.QRequest
import org.sejapoe.videomanager.repo.ArchiveEntryRepo
import org.sejapoe.videomanager.repo.DepartmentRepo
import org.sejapoe.videomanager.repo.InstituteRepo
import org.sejapoe.videomanager.repo.RequestRepo
import org.springframework.stereotype.Service

@Service
class InstituteService(
    private val instituteRepo: InstituteRepo,
    private val departmentRepo: DepartmentRepo,
    private val requestRepo: RequestRepo,
    private val archiveEntryRepo: ArchiveEntryRepo,
) {
    fun getAll(): List<Institute> = instituteRepo.findAll()

    fun create(name: String): Institute {
        val institute = Institute(name)

        checkDuplicate(institute, name)

        return instituteRepo.save(institute)
    }

    fun get(id: Long): Institute =
        instituteRepo.findById(id).orElseThrow { NotFoundException("Институт с ID $id не найден") }

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

        institutes.forEach { checkDuplicate(it, it.name) }

        return instituteRepo.saveAll(institutes)
    }

    @Transactional
    fun delete(id: Long, departmentReplacement: Map<Long, Long>) {
        val institute = get(id)

        val departmentReplacements = departmentReplacement.mapValues {
            departmentRepo.findById(it.value).orElseThrow {
                NotFoundException("Кафедра с ID ${it.value} не найдена")
            }
        }

        val departmentIds = institute.departments.map { it.id }

        val remainingDepartmentIds = departmentIds.toSet() - departmentReplacements.keys
        val isLinkedRequests = requestRepo.exists(QRequest.request.department.id.`in`(remainingDepartmentIds))
        val isLinkedArchiveEntries =
            archiveEntryRepo.exists(QArchiveEntry.archiveEntry.department.id.`in`(remainingDepartmentIds))
        if (isLinkedRequests || isLinkedArchiveEntries) {
            throw InstituteDeletionCascadeException(
                departmentIds.filter {
                    requestRepo.exists(QRequest.request.department.id.eq(it))
                            || archiveEntryRepo.exists(QArchiveEntry.archiveEntry.department.id.eq(it))
                }
            )
        }

        requestRepo.findAll(QRequest.request.department.id.`in`(departmentReplacements.keys)).forEach {
            it.department = departmentReplacements[it.department.id] ?: throw RuntimeException()
            it.institute = it.department.institute
        }

        archiveEntryRepo.findAll(QArchiveEntry.archiveEntry.department.id.`in`(departmentReplacements.keys)).forEach {
            it.department = departmentReplacements[it.department.id] ?: throw RuntimeException()
            it.institute = it.department.institute
        }

        instituteRepo.deleteById(id)
    }

    private fun checkDuplicate(institute: Institute, name: String) {
        val isDuplicate = getAll().any { it.name == name && it.id != institute.id }
        if (isDuplicate) {
            throw ConflictException("Институт с именем \"${name}\" уже существует")
        }
    }
}