package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.dto.ReportDto;
import com.batuhanozdamar.eproductionTest.entity.Company;
import com.batuhanozdamar.eproductionTest.entity.ReportForm;
import com.batuhanozdamar.eproductionTest.entity.User;
import com.batuhanozdamar.eproductionTest.repository.ReportRepository;
import com.batuhanozdamar.eproductionTest.repository.userRepository;
import com.batuhanozdamar.eproductionTest.service.ReportFormService;
import org.modelmapper.ModelMapper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class ReportImpl implements ReportFormService {

    private final ReportRepository reportRepository;
    private final ModelMapper modelMapper;
    private final userRepository userRepository;
    private final JavaMailSender javaMailSender;
    private final CompanyServiceImpl companyService;

    public ReportImpl(ReportRepository reportRepository, userRepository userRepository, ModelMapper modelMapper, JavaMailSender javaMailSender, CompanyServiceImpl companyService) {
        this.reportRepository = reportRepository;
        this.modelMapper = modelMapper;
        this.userRepository= userRepository;
        this.javaMailSender = javaMailSender;
        this.companyService = companyService;
    }

    private void sendEmail(String subject,String recipients, String mailBody) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(recipients);
        msg.setSubject(subject);
        msg.setText(mailBody);

        javaMailSender.send(msg);
    }

    @Override
    public ReportDto save(ReportDto reportForm) {

        ReportForm r = modelMapper.map(reportForm, ReportForm.class);

        reportForm.setNameSurname(reportForm.getNameSurname());
        reportForm.setEmail(reportForm.getEmail());
        reportForm.setSubject(reportForm.getSubject());
        reportForm.setMessage(reportForm.getMessage());
        r = reportRepository.save(r);

        //send email
        String recepeint = "eproductionturkey@gmail.com";
        String subject = "Report by "+ reportForm.getNameSurname();
        String mailBody= "Subject: " + "\"" + reportForm.getSubject() + "\" \n" +
                "Message: " + reportForm.getMessage() + "\n" + "Sender e-mail: " + reportForm.getEmail();

        sendEmail(subject,recepeint,mailBody);

        return reportForm;
    }
}
