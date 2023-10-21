package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import org.sejapoe.videomanager.dto.user.LoginReq
import org.sejapoe.videomanager.dto.user.RegisterReq
import org.sejapoe.videomanager.dto.user.TokenUserRes
import org.sejapoe.videomanager.mapper.UserMapper
import org.sejapoe.videomanager.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val userService: UserService,
    private val userMapper: UserMapper
) {
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    fun register(@Valid @RequestBody registerReq: RegisterReq) = userService.register(
        registerReq.email,
        registerReq.password,
        registerReq.fullName
    ).let {
        userMapper.toTokenUserRes(it.second, it.first)
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/login")
    fun login(@Valid @RequestBody loginReq: LoginReq): TokenUserRes {
        Thread.sleep(1000)
        return userService.login(loginReq.email, loginReq.password).let {
            userMapper.toTokenUserRes(it.second, it.first)
        }
    }

    @ExceptionHandler(BadCredentialsException::class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    fun handleBadCredentialsException() = ProblemDetail.forStatusAndDetail(
        HttpStatus.FORBIDDEN,
        "Invalid email or password"
    )
}