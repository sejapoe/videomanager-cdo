package org.sejapoe.videomanager.dto.request

import org.sejapoe.videomanager.dto.department.DepartmentRes
import org.sejapoe.videomanager.dto.institute.InstituteRes
import org.sejapoe.videomanager.dto.user.UserRes
import org.sejapoe.videomanager.model.RequestStatus

data class RequestRes(
    val id: Long,
    val name: String,
    val lecturer: UserRes,
    val institute: InstituteRes,
    val department: DepartmentRes,
    val linkToMoodle: String,
    val status: RequestStatus,
    val unreadCount: Int = 0
)