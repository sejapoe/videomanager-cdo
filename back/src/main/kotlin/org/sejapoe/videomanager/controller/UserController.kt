package org.sejapoe.videomanager.controller

import org.sejapoe.videomanager.dto.user.CreateLecturerReq
import org.sejapoe.videomanager.mapper.UserMapper
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.security.annotations.IsAdmin
import org.sejapoe.videomanager.security.annotations.IsUser
import org.sejapoe.videomanager.service.UserService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController(
    private val userMapper: UserMapper,
    private val userService: UserService,
) {
    @GetMapping("/api/user")
    @IsUser
    fun getUser(@AuthenticationPrincipal user: User) = userMapper.toUserRes(user)

    @PostMapping("/api/users")
    @IsAdmin
    fun createLecturer(@RequestBody createLecturerReq: CreateLecturerReq) =
        userService.createLecturer(createLecturerReq.name, createLecturerReq.email)

    @GetMapping("/api/users")
    @IsAdmin
    fun getAllLecturers() = userService.getLecturers().map(userMapper::toUserRes)
}