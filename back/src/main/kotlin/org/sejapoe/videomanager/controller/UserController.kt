package org.sejapoe.videomanager.controller

import org.sejapoe.videomanager.mapper.UserMapper
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.security.annotations.IsUser
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/user")
class UserController(
    private val userMapper: UserMapper
) {
    @GetMapping
    @IsUser
    fun getUser(@AuthenticationPrincipal user: User) = userMapper.toUserRes(user)
}