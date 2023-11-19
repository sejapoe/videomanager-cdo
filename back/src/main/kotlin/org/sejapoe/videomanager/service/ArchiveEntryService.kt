package org.sejapoe.videomanager.service

import org.sejapoe.videomanager.model.ArchiveEntry
import org.sejapoe.videomanager.model.Request
import org.sejapoe.videomanager.repo.ArchiveEntryRepo
import org.springframework.stereotype.Service

@Service
class ArchiveEntryService(
    private val archiveEntryRepo: ArchiveEntryRepo
) {
    fun createFromRequest(request: Request): ArchiveEntry {
        val archiveEntry = ArchiveEntry(
            request.name,
            request.lecturer,
            request.institute,
            request.department,
            "",
            request.linkToMoodle,
            request
        )
        return archiveEntryRepo.save(archiveEntry)
    }
}