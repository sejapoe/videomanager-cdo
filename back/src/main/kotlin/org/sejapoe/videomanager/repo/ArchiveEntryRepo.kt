package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.ArchiveEntry
import org.springframework.data.jpa.repository.JpaRepository

interface ArchiveEntryRepo : JpaRepository<ArchiveEntry, Long>