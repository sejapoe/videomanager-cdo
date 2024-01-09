package org.sejapoe.videomanager.service

import jakarta.mail.internet.InternetAddress
import jakarta.mail.internet.MimeMessage
import org.sejapoe.videomanager.model.QUserActivation
import org.sejapoe.videomanager.model.Request
import org.sejapoe.videomanager.repo.UserActivationRepo
import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service

@Service
class EmailService(
    private val emailSender: JavaMailSender,
    @Value("\${spring.security.cors.url}")
    private val frontUrl: String,
    private val userActivationRepo: UserActivationRepo,
    @Value("\${spring.mail.from}")
    private val mailFrom: String,
    @Value(
        "#{T(org.sejapoe.videomanager.utils.ResourceReader).readFileToString('mail_template.html')}",
    )
    private val htmlTemplate: String,
    @Value(
        "#{T(org.sejapoe.videomanager.utils.ResourceReader).readFileToString('mail_template.txt')}",
    )
    private val plainTextTemplate: String,
) {
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

    fun notify(request: Request) {
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

        val html =
            this.htmlTemplate.format(
                request.lecturer.fullName,
                request.name,
                url,
            )

        val plainText =
            this.plainTextTemplate.format(
                request.lecturer.fullName,
                request.name,
                url,
            )

        sendSimpleMessage(request.lecturer.email, "Новый запрос: ${request.name}", html, plainText)
    }
}
