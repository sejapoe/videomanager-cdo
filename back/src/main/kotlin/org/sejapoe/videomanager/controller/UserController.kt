package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.user.CreateLecturerReq
import org.sejapoe.videomanager.dto.user.FilterUserReq
import org.sejapoe.videomanager.dto.user.RenameLecturerReq
import org.sejapoe.videomanager.mapper.UserMapper
import org.sejapoe.videomanager.security.annotations.IsAdmin
import org.sejapoe.videomanager.security.annotations.IsUser
import org.sejapoe.videomanager.security.currentUser
import org.sejapoe.videomanager.service.UserService
import org.springdoc.core.annotations.ParameterObject
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class UserController(
    private val userMapper: UserMapper,
    private val userService: UserService,
) {
    @IsUser
    @GetMapping("/user")
    fun getUser() = userMapper.toUserRes(currentUser)

    @IsAdmin
    @GetMapping("/user/{id}")
    fun getUserById(@PathVariable id: Long) = userService.get(id).let(userMapper::toUserRes)

    @IsAdmin
    @PostMapping("/users")
    fun createLecturer(
        @RequestBody createLecturerReq: CreateLecturerReq,
    ) = userService.createLecturer(createLecturerReq.name, createLecturerReq.email).let(userMapper::toUserRes)

    @IsAdmin
    @GetMapping("/users")
    fun getLecturers(
        @ParameterObject @Valid filterUserReq: FilterUserReq,
    ) = userService.getLecturers(
        filterUserReq.toPredicate(),
        filterUserReq.toPageable(),
    ).map(userMapper::toUserRes)

    @IsAdmin
    @PutMapping("/user")
    fun renameUser(
        @RequestBody renameLecturerReq: RenameLecturerReq
    ) = userService.renameLecturer(
        renameLecturerReq.id,
        renameLecturerReq.name
    ).let(userMapper::toUserRes)

    @IsAdmin
    @PostMapping("/user/{id}/reset_password")
    fun resetPassword(
        @PathVariable id: Long
    ) = userService.resetPassword(id)
}
