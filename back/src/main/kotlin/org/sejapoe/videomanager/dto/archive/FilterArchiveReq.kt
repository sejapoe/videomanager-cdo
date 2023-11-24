package org.sejapoe.videomanager.dto.archive

import com.querydsl.core.types.ExpressionUtils
import com.querydsl.core.types.Predicate
import com.querydsl.core.types.dsl.Expressions
import org.sejapoe.videomanager.dto.core.PageableReq
import org.sejapoe.videomanager.model.QRequest
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort

data class FilterArchiveReq(
    override val page: Int? = 0,
    override val size: Int? = 50,
    val user: Long?,
    val institute: Long?,
    val department: Long?,
    override val sorting: String? = "id",
    override val direction: Sort.Direction? = Sort.Direction.ASC
) : PageableReq {

    override fun toPredicate(): Predicate {
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
        )
        return ExpressionUtils.allOf(list) ?: Expressions.TRUE
    }

    override fun toPageable(): Pageable =
        PageRequest.of(
            page ?: 0,
            size ?: 50,
            Sort.by(
                direction ?: Sort.Direction.ASC,
                sorting ?: "id"
            )
        )
}