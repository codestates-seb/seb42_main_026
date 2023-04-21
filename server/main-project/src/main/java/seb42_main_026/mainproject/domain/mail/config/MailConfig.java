package seb42_main_026.mainproject.domain.mail.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Configuration
public class MailConfig {
    @Value("${gmk}")
    private String googleSecret;

    @Bean
    public JavaMailSender javaMailSender(){
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

        javaMailSender.setHost("smtp.gmail.com");
        javaMailSender.setUsername("nakchoi94@gmail.com");
        javaMailSender.setPassword(googleSecret);

        javaMailSender.setPort(587);

        javaMailSender.setJavaMailProperties(getMailProperties());

        return javaMailSender;
    }

    private Properties getMailProperties(){
        Properties properties = new Properties();
        properties.setProperty("mail.debug", "true");
        properties.setProperty("mail.transport.protocol", "smtp");
        properties.setProperty("mail.smtp.starttls.enable", "true");
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.ssl.trust","smtp.gmail.com"); // smtp.google.com 이여서 오류가 났었다 ㅠ

        return properties;
    }
}

