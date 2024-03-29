package org.sejapoe.videomanager.mapper

import org.mapstruct.*
import org.sejapoe.videomanager.dto.request.FullRequestRes
import org.sejapoe.videomanager.dto.request.RequestRes
import org.sejapoe.videomanager.dto.request.ShortRequestRes
import org.sejapoe.videomanager.dto.request.UpdateRequestReq
import org.sejapoe.videomanager.model.Request

@Mapper(
    componentModel = "spring",
    uses = [InstituteMapper::class, DepartmentMapper::class, UserMapper::class, CorrectionMapper::class],
    injectionStrategy = InjectionStrategy.CONSTRUCTOR,
)
interface RequestMapper {
    fun toRequestRes(request: Request): RequestRes

    fun toFullRequestRes(request: Request): FullRequestRes

    fun toShortRequestRes(request: Request): ShortRequestRes

    fun toEntity(updateRequestReq: UpdateRequestReq): Request

    fun toDto(request: Request): UpdateRequestReq

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    fun partialUpdate(updateRequestReq: UpdateRequestReq, @MappingTarget request: Request): Request
}
