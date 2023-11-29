package org.sejapoe.videomanager.mapper

import org.mapstruct.Mapper
import org.mapstruct.MappingConstants
import org.sejapoe.videomanager.dto.archive.ArchiveEntryRes
import org.sejapoe.videomanager.model.ArchiveEntry

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = [UserMapper::class, InstituteMapper::class, DepartmentMapper::class, RequestMapper::class],
)
interface ArchiveEntryMapper {
    fun toDto(archiveEntry: ArchiveEntry): ArchiveEntryRes
}
