package org.sejapoe.videomanager.dto.request

import com.querydsl.core.types.ExpressionUtils
import com.querydsl.core.types.Predicate
import com.querydsl.core.types.dsl.Expressions
import org.sejapoe.videomanager.dto.core.PageableReq
import org.sejapoe.videomanager.model.QRequest
import org.sejapoe.videomanager.model.RequestStatus
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort

data class FilterRequestReq(
    override val page: Int? = 0,
    override val size: Int? = 50,
    val name: String?,
    val user: List<Long>?,
    val institute: List<Long>?,
    val department: List<Long>?,
    val status: List<RequestStatus>?,
    override val sorting: String? = "id",
    override val direction: Sort.Direction? = Sort.Direction.ASC
) : PageableReq {

    override fun toPredicate(): Predicate {
        val list = listOfNotNull(
            name?.let {
                QRequest.request.name.likeIgnoreCase("%$name%")
            },

            user?.takeIf { it.isNotEmpty() }
                ?.let {
                    QRequest.request.lecturer.id.`in`(it)
                },

            institute?.takeIf { it.isNotEmpty() }
                ?.let {
                    QRequest.request.institute.id.`in`(it)
                },

            department?.takeIf { it.isNotEmpty() }
                ?.let {
                    QRequest.request.department.id.`in`(it)
                },

            status?.takeIf { it.isNotEmpty() }
                ?.let {
                    QRequest.request.status.`in`(it)
                }
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