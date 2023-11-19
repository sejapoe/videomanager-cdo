package org.sejapoe.videomanager.service

import com.querydsl.core.types.Predicate
import org.sejapoe.videomanager.exception.ConflictException
import org.sejapoe.videomanager.exception.ForbiddenException
import org.sejapoe.videomanager.exception.NotFoundException
import org.sejapoe.videomanager.model.Request
import org.sejapoe.videomanager.model.RequestStatus
import org.sejapoe.videomanager.model.Role
import org.sejapoe.videomanager.model.User
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
) {
    fun create(name: String, lecturerId: Long, instituteId: Long, departmentId: Long, linkToMoodle: String): Request {
        val lecturer = userService.get(lecturerId)
        val institute = instituteService.get(instituteId)
        val department = departmentService.get(departmentId)
        if (department.institute != institute) throw ConflictException("Department ${department.name} does not belong to institute ${institute.name}")

        val request =
            Request(name, lecturer, institute, department, RequestStatus.CREATED, linkToMoodle, emptyList()).let(
                requestRepo::save
            )

        // todo: notify lecturer
        return request
    }

    fun getAll(requester: User, filterUserId: Long?, predicate: Predicate, pageable: Pageable): Page<Request> {
        if (requester.role == Role.ROLE_USER && requester.id != filterUserId) throw ForbiddenException("You cannot get other user's requests!")
        return requestRepo.findAll(predicate, pageable)
    }

    fun get(requester: User, id: Long): Request {
        val request = requestRepo.findById(id).getOrNull() ?: throw NotFoundException("Request with $id is not found")
        if (requester.role == Role.ROLE_USER && requester.id != request.lecturer.id) throw ForbiddenException("You cannot get other user's requests!")
        return request
    }

    fun updateStatus(id: Long, newStatus: RequestStatus, requester: User): Request {
        val request = get(requester, id)
        request.status = newStatus
        return requestRepo.save(request)
    }

}