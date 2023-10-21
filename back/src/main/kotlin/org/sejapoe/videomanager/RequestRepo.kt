package org.sejapoe.videomanager

import org.sejapoe.videomanager.model.Request
import org.springframework.data.jpa.repository.JpaRepository

interface RequestRepo : JpaRepository<Request, Long>