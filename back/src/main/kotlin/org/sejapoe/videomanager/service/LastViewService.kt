package org.sejapoe.videomanager.service

import org.sejapoe.videomanager.model.*
import org.sejapoe.videomanager.repo.LastViewRepo
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrElse

@Service
class LastViewService(
    private val lastViewRepo: LastViewRepo
) {

    fun countUnread(user: User, request: Request): Int = request.corrections.count {
        isUnread(user, it)
    }

    fun isUnread(user: User, correction: Correction): Boolean = lastViewRepo.findOne(
        QLastView.lastView.user.id.eq(user.id).and(QLastView.lastView.correction.id.eq(correction.id))
    ).map {
        it.lastViewedComment.id != correction.comments.last().id
    }.getOrElse {
        correction.comments.isNotEmpty()
    }

    fun view(user: User, correction: Correction) {
        val lastView = lastViewRepo.findOne(
            QLastView.lastView.user.id.eq(user.id).and(QLastView.lastView.correction.id.eq(correction.id))
        ).getOrElse {
            LastView(
                user,
                correction,
                correction.comments.last()
            )
        }
        lastView.lastViewedComment = correction.comments.last()
        lastViewRepo.save(lastView)
    }

}