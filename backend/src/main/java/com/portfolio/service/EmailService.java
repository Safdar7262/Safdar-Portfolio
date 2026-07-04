package com.portfolio.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${portfolio.notification.email}")
    private String notificationEmail;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Async
    public void sendContactNotification(String name, String email,
                                        String subject, String message) {
        try {
            MimeMessage mime = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mime, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(notificationEmail);
            helper.setSubject("📬 New Contact: " + (subject != null && !subject.isEmpty() ? subject : "Portfolio Message from " + name));
            helper.setReplyTo(email);

            String html = """
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #07070b; color: #e8e8f0; border-radius: 12px; overflow: hidden;">
                  <div style="background: #e11d48; padding: 24px 32px;">
                    <h1 style="margin: 0; font-size: 22px; color: #fff;">New Portfolio Message</h1>
                    <p style="margin: 6px 0 0; color: rgba(255,255,255,.7); font-size: 14px;">Someone reached out via your portfolio</p>
                  </div>
                  <div style="padding: 32px;">
                    <table style="width: 100%%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.08); color: rgba(255,255,255,.45); font-size: 12px; width: 80px;">NAME</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.08); font-size: 14px;">%s</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.08); color: rgba(255,255,255,.45); font-size: 12px;">EMAIL</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.08); font-size: 14px;"><a href="mailto:%s" style="color: #e11d48;">%s</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.08); color: rgba(255,255,255,.45); font-size: 12px;">SUBJECT</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.08); font-size: 14px;">%s</td>
                      </tr>
                    </table>
                    <div style="margin-top: 24px;">
                      <p style="color: rgba(255,255,255,.45); font-size: 12px; margin-bottom: 10px;">MESSAGE</p>
                      <div style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.7;">%s</div>
                    </div>
                    <div style="margin-top: 24px; text-align: center;">
                      <a href="mailto:%s" style="display: inline-block; background: #e11d48; color: #fff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">Reply to %s</a>
                    </div>
                  </div>
                  <div style="padding: 16px 32px; background: rgba(255,255,255,.02); text-align: center; font-size: 11px; color: rgba(255,255,255,.25);">
                    Sent from your portfolio contact form · Spring Boot + MySQL
                  </div>
                </div>
            """.formatted(name, email, email,
                    subject != null ? subject : "No subject",
                    message, email, name);

            helper.setText(html, true);
            mailSender.send(mime);
            log.info("Contact notification email sent for: {}", email);

        } catch (Exception e) {
            log.error("Failed to send email notification: {}", e.getMessage());
        }
    }
}