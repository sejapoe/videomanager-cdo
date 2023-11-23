package org.sejapoe.videomanager.dto.request

import com.querydsl.core.types.ExpressionUtils
import com.querydsl.core.types.Predicate
import com.querydsl.core.types.dsl.Expressions
import org.sejapoe.videomanager.dto.core.PageableReq
import org.sejapoe.videomanager.dto.core.SortableReq
import org.sejapoe.videomanager.model.QRequest
import org.sejapoe.videomanager.model.RequestStatus
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort

data class FilterRequestReq(
        override val page: Int? = 0,
        override val size: Int? = 50,
    val user: Long?,
    val institute: Long?,
    val department: Long?,
    val status: RequestStatus?,
        override val sorting: String? = "id",
        override val direction: Sort.Direction? = Sort.Direction.ASC
) : PageableReq, SortableReq {

    fun toPredicate(): Predicate {
        val list = listOfNotNull(
            user?.let {
                QRequest.request.lecturer.id.eq(it)
            },
            institute?.let {
                QRequest.request.institute.id.eq(it)
            },
            department?.let {
                QRequest.request.department.id.eq(it)
            },
            status?.let {
                QRequest.request.status.eq(it)
            }
        )
        return ExpressionUtils.allOf(list) ?: Expressions.TRUE
    }

    fun toPageable(): Pageable =
        PageRequest.of(
            page ?: 0,
            size ?: 50,
            Sort.by(
                direction ?: Sort.Direction.ASC,
                sorting ?: "id"
            )
        )
}