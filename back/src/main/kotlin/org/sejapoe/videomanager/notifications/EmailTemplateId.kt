package org.sejapoe.videomanager.notifications

@Target(AnnotationTarget.FIELD)
@Retention((AnnotationRetention.RUNTIME))
annotation class EmailTemplateId(val value: String)
