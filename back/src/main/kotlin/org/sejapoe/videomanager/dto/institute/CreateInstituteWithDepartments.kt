package org.sejapoe.videomanager.dto.institute

data class CreateInstituteWithDepartments(
    val name: String,
    val departments: List<String>,
)
