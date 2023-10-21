package org.sejapoe.videomanager.service

import org.sejapoe.videomanager.model.Institute
import org.sejapoe.videomanager.repo.InstituteRepo
import org.springframework.stereotype.Service

@Service
class InstituteService(
    private val instituteRepo: InstituteRepo
) {
    fun getAll(): List<Institute> = instituteRepo.findAll()

    fun create(name: String) = instituteRepo.save(Institute(name))
}