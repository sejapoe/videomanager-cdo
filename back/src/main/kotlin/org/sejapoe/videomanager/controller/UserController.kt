package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.user.CreateLecturerReq
import org.sejapoe.videomanager.dto.user.FilterUserReq
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
}
