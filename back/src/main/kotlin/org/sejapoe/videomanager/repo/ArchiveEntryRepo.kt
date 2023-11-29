package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.ArchiveEntry
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor

interface ArchiveEntryRepo : JpaRepository<ArchiveEntry, Long>, QuerydslPredicateExecutor<ArchiveEntry>
