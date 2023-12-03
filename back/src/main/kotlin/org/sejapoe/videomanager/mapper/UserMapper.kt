package org.sejapoe.videomanager.mapper

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.sejapoe.videomanager.dto.user.TokenUserRes
import org.sejapoe.videomanager.dto.user.UserRes
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.service.AuthService

@Mapper(componentModel = "spring")
interface UserMapper {
    fun toUserRes(user: User): UserRes

    @Mapping(target = "userInfo", source = "user")
    @Mapping(target = "accessToken", source = "tokens.access")
    @Mapping(target = "refreshToken", source = "tokens.refresh")
    fun toTokenUserRes(
        user: User,
        tokens: AuthService.Tokens,
    ): TokenUserRes
}
