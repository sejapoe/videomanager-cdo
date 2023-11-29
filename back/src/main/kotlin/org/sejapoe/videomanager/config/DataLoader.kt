package org.sejapoe.videomanager.config

import org.sejapoe.videomanager.service.UserService
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component

@Component
class DataLoader(private val userService: UserService) : ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        userService.createAdmin("Администратор", "admin@admin.com")
    }
}
