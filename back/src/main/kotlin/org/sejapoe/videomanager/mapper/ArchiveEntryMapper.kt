package org.sejapoe.videomanager.mapper

import org.mapstruct.*
import org.sejapoe.videomanager.dto.archive.ArchiveEntryRes
import org.sejapoe.videomanager.dto.archive.UpdateArchiveEntryReq
import org.sejapoe.videomanager.model.ArchiveEntry

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = [UserMapper::class, InstituteMapper::class, DepartmentMapper::class, RequestMapper::class],
)
interface ArchiveEntryMapper {
    fun toDto(archiveEntry: ArchiveEntry): ArchiveEntryRes

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    fun partialUpdate(
        updateArchiveEntryReq: UpdateArchiveEntryReq,
        @MappingTarget archiveEntry: ArchiveEntry
    ): ArchiveEntry
}
