package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.Correction
import org.springframework.data.jpa.repository.JpaRepository

interface CorrectionRepo : JpaRepository<Correction, Long>