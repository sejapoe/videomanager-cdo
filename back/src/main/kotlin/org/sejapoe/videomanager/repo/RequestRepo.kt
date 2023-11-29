package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.Request
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor

interface RequestRepo : JpaRepository<Request, Long>, QuerydslPredicateExecutor<Request>
