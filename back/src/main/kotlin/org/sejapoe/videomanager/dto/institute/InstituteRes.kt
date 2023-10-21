package org.sejapoe.videomanager.dto.institute

import org.sejapoe.videomanager.dto.department.DepartmentRes

data class InstituteRes(
    val id: Long,
    val name: String,
    val departments: List<DepartmentRes>
)