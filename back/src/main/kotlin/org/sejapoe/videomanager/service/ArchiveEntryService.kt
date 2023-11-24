package org.sejapoe.videomanager.service

import com.querydsl.core.types.Predicate
import org.sejapoe.videomanager.dto.archive.CreateArchiveEntryReq
import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.model.ArchiveEntry
import org.sejapoe.videomanager.model.Request
import org.sejapoe.videomanager.repo.ArchiveEntryRepo
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class ArchiveEntryService(
    private val archiveEntryRepo: ArchiveEntryRepo,
    private val userService: UserService,
    private val instituteService: InstituteService,
    private val departmentService: DepartmentService
) {
    fun get(id: Long) =
        archiveEntryRepo.findById(id).orElseThrow { NotFoundException("Archive Entry with id $id is not found!") }

    fun createFromRequest(request: Request) = ArchiveEntry(
        request.name,
        request.lecturer,
        request.institute,
        request.department,
        request.linkToVideo,
        request.linkToMoodle,
        request
    ).let(archiveEntryRepo::save)

    fun create(createArchiveEntryReq: CreateArchiveEntryReq) = ArchiveEntry(
        createArchiveEntryReq.name,
        userService.get(createArchiveEntryReq.lecturerId),
        instituteService.get(createArchiveEntryReq.instituteId),
        departmentService.get(createArchiveEntryReq.departmentId),
        createArchiveEntryReq.linkToVideo,
        createArchiveEntryReq.linkToMoodle,
        null
    ).let(archiveEntryRepo::save)

    fun getAll(predicate: Predicate, pageable: Pageable): Page<ArchiveEntry> =
        archiveEntryRepo.findAll(predicate, pageable)
}