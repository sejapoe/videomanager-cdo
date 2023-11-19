package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.LastView
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor

interface LastViewRepo : JpaRepository<LastView, Long>, QuerydslPredicateExecutor<LastView>