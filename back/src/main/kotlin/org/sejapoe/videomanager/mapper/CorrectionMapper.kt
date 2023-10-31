package org.sejapoe.videomanager.mapper

import org.mapstruct.Mapper
import org.sejapoe.videomanager.dto.correction.CorrectionRes
import org.sejapoe.videomanager.model.Correction

@Mapper(componentModel = "spring")
interface CorrectionMapper {
    fun toCorrectionRes(correction: Correction): CorrectionRes
}