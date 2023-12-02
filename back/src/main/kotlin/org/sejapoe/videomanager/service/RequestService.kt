package org.sejapoe.videomanager.service

import com.querydsl.core.types.Predicate
import org.sejapoe.videomanager.exception.ConflictException
import org.sejapoe.videomanager.exception.ForbiddenException
import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.model.*
import org.sejapoe.videomanager.repo.RequestRepo
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class RequestService(
    private val requestRepo: RequestRepo,
    private val userService: UserService,
    private val instituteService: InstituteService,
    private val departmentService: DepartmentService,
    private val archiveEntryService: ArchiveEntryService,
    private val emailService: EmailService,
) {
    fun create(
        name: String,
        lecturerId: Long,
        instituteId: Long,
        departmentId: Long,
        linkToMoodle: String,
        linkToVideo: String,
    ): Request {
        val lecturer = userService.get(lecturerId)
        val institute = instituteService.get(instituteId)
        val department = departmentService.get(departmentId)
        if (department.institute != institute) {
            throw ConflictException(
                "Кафедра \"${department.name}\" не принадлежит институту \"${institute.name}\"",
            )
        }

        val request =
            Request(
                name,
                lecturer,
                institute,
                department,
                RequestStatus.CREATED,
                linkToMoodle,
                linkToVideo,
                emptyList(),
            ).let(
                requestRepo::save,
            )

        emailService.notify(request)

        return request
    }

    fun getAll(
        requester: User,
        filterUserId: List<Long>,
        predicate: Predicate,
        pageable: Pageable,
    ): Page<Request> {
        if (requester.role == Role.ROLE_USER && (filterUserId.size != 1 || requester.id != filterUserId.first())) {
            throw ForbiddenException("You cannot get other user's requests!")
        }
        return requestRepo.findAll(
            predicate.let {
                if (requester.role == Role.ROLE_USER) QRequest.request.status.ne(RequestStatus.ARCHIVED).and(it) else it
            },
            pageable,
        )
    }

    fun get(
        requester: User,
        id: Long,
    ): Request {
        val request = get(id)
        if (requester.role == Role.ROLE_USER && requester.id != request.lecturer.id) {
            throw ForbiddenException(
                "You cannot get other user's requests!",
            )
        }
        return request
    }

    private fun get(id: Long): Request {
        val request = requestRepo.findById(id).getOrNull() ?: throw NotFoundException("Request with $id is not found")
        return request
    }

    fun updateStatus(
        id: Long,
        newStatus: RequestStatus,
        requester: User,
    ): Request {
        val request = get(requester, id)
        request.status = newStatus
        return requestRepo.save(request)
    }

    fun archive(
        id: Long,
        requester: User,
    ): ArchiveEntry {
        val request = get(requester, id)
        request.status = RequestStatus.ARCHIVED
        requestRepo.save(request)
        return archiveEntryService.createFromRequest(request)
    }

    fun delete(id: Long) {
        val request = get(id)

        archiveEntryService.detach(request)

        requestRepo.delete(request)
    }

    fun update(id: Long, transformer: (Request) -> Request): Request {
        val request = get(id)
        return requestRepo.save(transformer(request))
    }
}
