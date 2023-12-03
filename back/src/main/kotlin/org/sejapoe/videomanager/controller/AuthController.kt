package org.sejapoe.videomanager.controller

import jakarta.validation.Valid
import jakarta.validation.constraints.Pattern
import org.sejapoe.videomanager.dto.user.ActivateUserReq
import org.sejapoe.videomanager.dto.user.LoginReq
import org.sejapoe.videomanager.dto.user.RefreshReq
import org.sejapoe.videomanager.dto.user.TokenUserRes
import org.sejapoe.videomanager.mapper.UserMapper
import org.sejapoe.videomanager.service.AuthService
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val userMapper: UserMapper,
    private val authService: AuthService,
) {
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/login")
    fun login(
        @Valid @RequestBody loginReq: LoginReq,
    ): TokenUserRes {
        return authService.login(loginReq.email, loginReq.password).let {
            userMapper.toTokenUserRes(it.first, it.second)
        }
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/refresh")
    fun refresh(
        @Valid @RequestBody refreshReq: RefreshReq
    ): TokenUserRes {
        return authService.refresh(refreshReq.token).let {
            userMapper.toTokenUserRes(it.first, it.second)
        }
    }

    @GetMapping("/activation/{uuid}")
    fun getActivation(
        @PathVariable @Valid @Pattern(
            regexp = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}\$",
            flags = [Pattern.Flag.CASE_INSENSITIVE],
            message = "Not a valid UUID",
        ) uuid: UUID,
    ) = authService.getUserByActivationUuid(uuid).let(userMapper::toUserRes)

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/activate")
    fun activate(
        @Valid @RequestBody activateUserReq: ActivateUserReq,
    ): TokenUserRes =
        authService.activateLecturer(activateUserReq.uuid, activateUserReq.password).let {
            userMapper.toTokenUserRes(it.first, it.second)
        }

    @ExceptionHandler(BadCredentialsException::class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    fun handleBadCredentialsException() =
        ProblemDetail.forStatusAndDetail(
            HttpStatus.FORBIDDEN,
            "Неверный логин или пароль",
        )
}
