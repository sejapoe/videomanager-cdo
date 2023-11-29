package org.sejapoe.videomanager.controller

import org.sejapoe.videomanager.dto.archive.ArchiveEntryRes
import org.sejapoe.videomanager.dto.archive.CreateArchiveEntryReq
import org.sejapoe.videomanager.dto.archive.FilterArchiveReq
import org.sejapoe.videomanager.mapper.ArchiveEntryMapper
import org.sejapoe.videomanager.security.annotations.IsAdmin
import org.sejapoe.videomanager.service.ArchiveEntryService
import org.springdoc.core.annotations.ParameterObject
import org.springframework.data.domain.Page
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/archive")
class ArchiveController(
    private val archiveEntryService: ArchiveEntryService,
    private val archiveEntryMapper: ArchiveEntryMapper,
) {
    @IsAdmin
    @GetMapping("/{id}")
    fun getArchive(
        @PathVariable id: Long,
    ): ArchiveEntryRes = archiveEntryService.get(id).let(archiveEntryMapper::toDto)

    @IsAdmin
    @PostMapping
    fun createArchive(
        @RequestBody createArchiveEntryReq: CreateArchiveEntryReq,
    ): ArchiveEntryRes = archiveEntryService.create(createArchiveEntryReq).let(archiveEntryMapper::toDto)

    @IsAdmin
    @GetMapping
    fun getAllArchiveEntries(
        @ParameterObject filterArchiveReq: FilterArchiveReq,
    ): Page<ArchiveEntryRes> =
        archiveEntryService
            .getAll(filterArchiveReq.toPredicate(), filterArchiveReq.toPageable())
            .map(archiveEntryMapper::toDto)
}
