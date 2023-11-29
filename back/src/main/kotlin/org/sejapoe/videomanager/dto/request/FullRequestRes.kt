package org.sejapoe.videomanager.dto.request

import org.sejapoe.videomanager.dto.correction.CorrectionRes
import org.sejapoe.videomanager.dto.department.DepartmentRes
import org.sejapoe.videomanager.dto.institute.InstituteRes
import org.sejapoe.videomanager.dto.user.UserRes
import org.sejapoe.videomanager.model.RequestStatus

data class FullRequestRes(
    val id: Long,
    val name: String,
    val lecturer: UserRes,
    val institute: InstituteRes,
    val department: DepartmentRes,
    val linkToMoodle: String,
    val linkToVideo: String,
    val status: RequestStatus,
    val corrections: List<CorrectionRes>,
)
