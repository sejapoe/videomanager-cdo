package org.sejapoe.videomanager.mapper

import org.mapstruct.Mapper
import org.sejapoe.videomanager.dto.department.DepartmentRes
import org.sejapoe.videomanager.model.Department

@Mapper(componentModel = "spring")
interface DepartmentMapper {
    fun toDepartmentRes(department: Department): DepartmentRes
}
