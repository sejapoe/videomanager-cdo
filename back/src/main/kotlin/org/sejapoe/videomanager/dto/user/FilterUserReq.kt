package org.sejapoe.videomanager.dto.user

import com.querydsl.core.types.ExpressionUtils
import com.querydsl.core.types.Predicate
import com.querydsl.core.types.dsl.Expressions
import org.sejapoe.videomanager.dto.core.PageableReq
import org.sejapoe.videomanager.model.QUser
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort

data class FilterUserReq(
    override val page: Int? = 0,
    override val size: Int? = 50,
    val name: String?,
    val email: String?,
    val enabled: List<Boolean>?,
    override val sorting: String? = "id",
    override val direction: Sort.Direction? = Sort.Direction.ASC
) : PageableReq {
    override fun toPredicate(): Predicate {
        val list = listOfNotNull(
            name?.let {
                QUser.user.fullName.likeIgnoreCase("%$name%")
            },

            email?.let {
                QUser.user.email.likeIgnoreCase("%$name%")
            },

            enabled?.takeIf { it.isNotEmpty() }
                ?.let {
                    QUser.user.enabled.`in`(it)
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
