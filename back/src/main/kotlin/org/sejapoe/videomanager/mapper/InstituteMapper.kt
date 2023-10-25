package org.sejapoe.videomanager.mapper

import org.mapstruct.InjectionStrategy
import org.mapstruct.Mapper
import org.sejapoe.videomanager.dto.institute.InstituteRes
import org.sejapoe.videomanager.dto.institute.InstituteWithDepartmentsRes
import org.sejapoe.videomanager.model.Institute

@Mapper(componentModel = "spring", uses = [DepartmentMapper::class], injectionStrategy = InjectionStrategy.CONSTRUCTOR)
interface InstituteMapper {
    fun toInstituteWithDepartmentsRes(institute: Institute): InstituteWithDepartmentsRes

    fun toInstituteRes(institute: Institute): InstituteRes
}