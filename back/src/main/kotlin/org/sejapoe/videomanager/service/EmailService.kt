package org.sejapoe.videomanager.service

import jakarta.mail.internet.InternetAddress
import jakarta.mail.internet.MimeMessage
import org.sejapoe.videomanager.model.QUserActivation
import org.sejapoe.videomanager.model.Request
import org.sejapoe.videomanager.repo.UserActivationRepo
import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.javamail.JavaMailSender
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
    private val html: String,
) {
    fun sendSimpleMessage(
        to: String,
        subject: String,
        htmlContent: String,
    ) {
        val message =
            emailSender.createMimeMessage().apply {
                setFrom(InternetAddress(mailFrom))
                setRecipients(MimeMessage.RecipientType.TO, to)
                setSubject(subject)
                setContent(htmlContent, "text/html; charset=utf-8")
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
            this.html.format(
                request.lecturer.fullName,
                request.name,
                url,
            )
        sendSimpleMessage(request.lecturer.email, "Новый запрос: ${request.name}", html)
    }
}
