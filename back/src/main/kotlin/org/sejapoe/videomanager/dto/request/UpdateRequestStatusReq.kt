package org.sejapoe.videomanager.dto.request

import org.sejapoe.videomanager.model.RequestStatus

data class UpdateRequestStatusReq(
    val id: Long,
    val newStatus: RequestStatus,
)
