package org.sejapoe.videomanager.exception

class InstituteDeletionCascadeException(val departmentIds: List<Long>) :
    ConflictException("Cascade error while trying delete institute")
