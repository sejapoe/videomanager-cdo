package org.sejapoe.videomanager.mapper

import org.mapstruct.InjectionStrategy
import org.mapstruct.Mapper
import org.sejapoe.videomanager.dto.request.RequestRes
import org.sejapoe.videomanager.model.Request

@Mapper(
    componentModel = "spring",
    uses = [InstituteMapper::class, DepartmentMapper::class, UserMapper::class],
    injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
interface RequestMapper {
    fun toRequestRes(request: Request): RequestRes
}