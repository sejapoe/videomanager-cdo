package org.sejapoe.videomanager.dto.core

import com.querydsl.core.types.Predicate
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort

interface PageableReq {
    val page: Int?
    val size: Int?
    val sorting: String?
    val direction: Sort.Direction?
    fun toPredicate(): Predicate
    fun toPageable(): Pageable
}