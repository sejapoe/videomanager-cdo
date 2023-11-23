package org.sejapoe.videomanager.dto.core

import org.springframework.data.domain.Sort

interface SortableReq {
    val sorting: String?
    val direction: Sort.Direction?
}