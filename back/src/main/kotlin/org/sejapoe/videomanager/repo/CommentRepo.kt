package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.Comment
import org.springframework.data.jpa.repository.JpaRepository

interface CommentRepo : JpaRepository<Comment, Long>
