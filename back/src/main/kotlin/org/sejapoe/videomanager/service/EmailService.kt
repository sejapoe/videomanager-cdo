package org.sejapoe.videomanager.service

import jakarta.mail.internet.InternetAddress
import jakarta.mail.internet.MimeMessage
import org.sejapoe.videomanager.model.QUserActivation
import org.sejapoe.videomanager.model.Request
import org.sejapoe.videomanager.model.User
import org.sejapoe.videomanager.notifications.EmailTemplate
import org.sejapoe.videomanager.notifications.EmailTemplateId
import org.sejapoe.videomanager.repo.UserActivationRepo
import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service

@Service
class EmailService(
    private val emailSender: JavaMailSender,
    private val userActivationRepo: UserActivationRepo,
    @Value("\${spring.security.cors.url}")
    private val frontUrl: String,
    @Value("\${spring.mail.from}")
    private val mailFrom: String
) {
    @EmailTemplateId("new_request")
    private lateinit var newRequestTemplate: EmailTemplate

    @EmailTemplateId("reset_password")
    private lateinit var resetPasswordTemplate: EmailTemplate

    fun sendSimpleMessage(
        to: String,
        subject: String,
        htmlContent: String,
        plainTextContent: String,
    ) {
        val message = emailSender.createMimeMessage().apply {
            MimeMessageHelper(this, true).run {
                setFrom(InternetAddress(mailFrom))
                setRecipients(MimeMessage.RecipientType.TO, to)
                setSubject(subject)
                setText(plainTextContent, htmlContent)
            }
        }

        emailSender.send(message)
    }

    fun sendEmailTemplate(
        to: String,
        subject: String,
        emailTemplate: EmailTemplate,
        vararg args: Any?
    ) {
        sendSimpleMessage(
            to,
            subject,
            emailTemplate.htmlTemplate.format(*args),
            emailTemplate.plainTextTemplate.format(*args)
        )
    }

    fun notifyNewRequest(request: Request) {
        val requestUrl = "/app/requests/${request.id}"

        val url =
            if (request.lecturer.enabled) {
                "${frontUrl}$requestUrl"
            } else {
                "$frontUrl/auth/activate/${
                    userActivationRepo.findOne(
                        QUserActivation.userActivation.user.id.eq(
                            request.lecturer.id,
                        ),
                    ).orElseThrow().uuid
                }?redirect_uri=$requestUrl"
            }

        sendEmailTemplate(
            request.lecturer.email,
            "Новый запрос: ${request.name}",
            newRequestTemplate,
            request.lecturer.fullName,
            request.name,
            url,
        )
    }

    fun notifyPasswordReset(user: User) {
        val url = "$frontUrl/auth/activate/${
            userActivationRepo.findOne(
                QUserActivation.userActivation.user.id.eq(
                    user.id,
                ),
            ).orElseThrow().uuid
        }"

        sendEmailTemplate(
            user.email,
            "Сброс пароля",
            resetPasswordTemplate,
            user.fullName,
            url
        )
    }
}
