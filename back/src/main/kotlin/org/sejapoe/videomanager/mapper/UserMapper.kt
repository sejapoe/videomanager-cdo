package org.sejapoe.videomanager.mapper

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.sejapoe.videomanager.dto.user.TokenUserRes
import org.sejapoe.videomanager.dto.user.UserRes
import org.sejapoe.videomanager.model.User

@Mapper(componentModel = "spring")
interface UserMapper {
    fun toUserRes(user: User): UserRes

    @Mapping(target = "token", source = "token")
    fun toTokenUserRes(user: User, token: String): TokenUserRes
}