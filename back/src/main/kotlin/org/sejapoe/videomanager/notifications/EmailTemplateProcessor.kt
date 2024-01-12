package org.sejapoe.videomanager.notifications

import org.sejapoe.videomanager.utils.ResourceReader
import org.springframework.beans.factory.config.BeanPostProcessor
import org.springframework.stereotype.Component

@Component
class EmailTemplateProcessor : BeanPostProcessor {
    override fun postProcessBeforeInitialization(bean: Any, beanName: String): Any? {
        val clazz = bean.javaClass
        val fields = clazz.declaredFields

        for (field in fields) {
            val annotation = field.getAnnotation(EmailTemplateId::class.java) ?: continue

            val templateId = annotation.value
            field.isAccessible = true
            val emailTemplate = createEmailTemplate(templateId)
            field.set(bean, emailTemplate)
        }

        return super.postProcessBeforeInitialization(bean, beanName)
    }

    private fun createEmailTemplate(templateId: String) = EmailTemplate(
        ResourceReader.readFileToString("email/$templateId.html"),
        ResourceReader.readFileToString("email/$templateId.txt")
    )
}