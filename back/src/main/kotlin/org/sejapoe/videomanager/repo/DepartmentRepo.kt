package org.sejapoe.videomanager.repo

import org.sejapoe.videomanager.model.Department
import org.springframework.data.jpa.repository.JpaRepository

interface DepartmentRepo : JpaRepository<Department, Long>
