package org.sejapoe.videomanager.controller

import org.sejapoe.videomanager.dto.user.CreateLecturerReq
import org.sejapoe.videomanager.mapper.UserMapper
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.security.annotations.IsAdmin
import org.sejapoe.videomanager.security.annotations.IsUser
import org.sejapoe.videomanager.service.UserService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/user")
class UserController(
    private val userMapper: UserMapper,
    private val userService: UserService,
) {
    @GetMapping
    @IsUser
    fun getUser(@AuthenticationPrincipal user: User) = userMapper.toUserRes(user)

    @PostMapping
    @IsAdmin
    fun createLecturer(@RequestBody createLecturerReq: CreateLecturerReq) =
        userService.createLecturer(createLecturerReq.name, createLecturerReq.email)
}