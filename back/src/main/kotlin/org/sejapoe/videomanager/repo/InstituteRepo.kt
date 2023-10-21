package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.Institute
import org.springframework.data.jpa.repository.JpaRepository

interface InstituteRepo : JpaRepository<Institute, Long>