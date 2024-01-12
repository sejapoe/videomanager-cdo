package org.sejapoe.videomanager.controller

import org.sejapoe.videomanager.security.annotations.IsAdmin
import org.sejapoe.videomanager.service.EmailService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/test")
class TestController(private val emailService: EmailService) {

    @IsAdmin
    @PostMapping
    fun test() {
        emailService.sendSimpleMessage(
            to = "bekaldiev2015@gmail.com",
            subject = "Test mail",
            htmlContent = "test",
            plainTextContent = "test"
        )
    }
}