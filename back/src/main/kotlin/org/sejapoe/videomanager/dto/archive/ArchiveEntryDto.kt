package org.sejapoe.videomanager.dto.archive

import org.sejapoe.videomanager.dto.department.DepartmentRes
import org.sejapoe.videomanager.dto.institute.InstituteRes
import org.sejapoe.videomanager.dto.request.ShortRequestRes
import org.sejapoe.videomanager.dto.user.UserRes

data class ArchiveEntryDto(
    val id: Long,
    val name: String,
    val lecturer: UserRes,
    val institute: InstituteRes,
    val department: DepartmentRes,
    val linkToVideo: String,
    val linkToMoodle: String,
    val request: ShortRequestRes
)
