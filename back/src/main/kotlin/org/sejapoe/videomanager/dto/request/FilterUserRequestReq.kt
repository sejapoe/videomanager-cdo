package org.sejapoe.videomanager.dto.request

import com.querydsl.core.types.Predicate
import com.querydsl.core.types.dsl.Expressions
import org.sejapoe.videomanager.model.QRequest
import org.sejapoe.videomanager.model.RequestStatus
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort

data class FilterUserRequestReq(
    val page: Int? = 0,
    val size: Int? = 50,
    val institute: Long?,
    val department: Long?,
    val status: RequestStatus?,
    val sorting: String? = "id",
    val direction: Sort.Direction? = Sort.Direction.ASC
) {

    fun toPredicateWithUser(id: Long): Predicate {
        val list = listOfNotNull(
            QRequest.request.lecturer.id.eq(id),
            institute?.let {
                QRequest.request.institute.id.eq(it)
            },
            department?.let {
                QRequest.request.department.id.eq(it)
            },
            status?.let {
                QRequest.request.status.eq(it)
            }
        ).toTypedArray()
        return Expressions.allOf(*list)
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