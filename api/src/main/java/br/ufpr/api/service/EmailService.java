package br.ufpr.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String remetente;

    public void enviarSenhaDeCadastro(String destinatario, String senha) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(remetente);
            message.setTo(destinatario);
            message.setSubject("Bem-vindo ao PhoenixLAB!");
            message.setText("Seu cadastro em nosso sistema foi realizado com sucesso.\n\n" +
                            "Sua senha de acesso inicial é: " + senha + "\n\n" +
                            "Atenciosamente,\nEquipe de Manutenção.");
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Erro ao enviar email: " + e.getMessage());
        }
    }
}