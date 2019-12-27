package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.dto.CompanyDto;
import com.batuhanozdamar.eproductionTest.dto.CompanyProductDto;
import com.batuhanozdamar.eproductionTest.dto.OfferDto;
import com.batuhanozdamar.eproductionTest.entity.*;
import com.batuhanozdamar.eproductionTest.repository.CompanyProductRepository;
import com.batuhanozdamar.eproductionTest.repository.offerRepository;
import com.batuhanozdamar.eproductionTest.repository.userRepository;
import com.batuhanozdamar.eproductionTest.service.offerService;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class offerServiceImpl implements offerService {

    private final offerRepository offerRepository;
    private final ModelMapper modelMapper;
    private final userRepository userRepository;
    private final CompanyServiceImpl companyService;
    //private final CompanyProductService companyProductService;
    private final OfferStatusServiceImpl offerStatusService;
    private final JavaMailSender javaMailSender;
    private final CompanyProductRepository companyProductRepository;


    public offerServiceImpl(offerRepository offerRepository, userRepository userRepository, ModelMapper modelMapper, CompanyServiceImpl companyService, OfferStatusServiceImpl offerStatusService, JavaMailSender javaMailSender, CompanyProductRepository companyProductRepository) {
        this.offerRepository = offerRepository;
        this.modelMapper = modelMapper;
        this.userRepository= userRepository;
        this.companyService = companyService;
       // this.companyProductService = companyProductService;
        this.offerStatusService = offerStatusService;
        this.javaMailSender = javaMailSender;
        this.companyProductRepository = companyProductRepository;
    }

    private void sendEmail(String subject, String[] recipients, String mailBody) {

        SimpleMailMessage msg = new SimpleMailMessage();
        // msg.setTo("emredemirbag@gmail.com", "batuhan_ozdamar@hotmail.com", "dogusguleryuz@gmail.com");
        msg.setTo(recipients);

        msg.setSubject(subject);
        msg.setText(mailBody);
        // msg.setText("There is an offer for this product: " + "\"" + product.getProductName() + "\" \n" +
        //       "Amount of offer: " + offer.getAskedPrice());

        javaMailSender.send(msg);
    }

    @Override
    public offer getById(Company company, CompanyProduct companyProduct) {
        return offerRepository.getOneByCompanyProduct(company, companyProduct).orElse(null);
    }



    @Override
    public OfferDto save(OfferDto offer) {
        //    product productCheck = productRepository.getByProductCategory(product.getProductCategory());

        //if (productCheck != null)
        //  throw new IllegalArgumentException("Product Category Already Exist");

        offer of = new offer();

        Company company = companyService.getById(offer.getCompanyDto().getId());
        //CompanyProduct companyProduct = modelMapper.map(companyProductService.getById(offer.getCompanyProductDto().getId()), CompanyProduct.class);

        of.setId(offer.getId());
        of.setAskedPrice(offer.getAskedPrice());
        of.setAskedAmount(offer.getAskedAmount());
        of.setCompany(company);
        of.setCompanyProduct(modelMapper.map(offer.getCompanyProductDto(), CompanyProduct.class));
        of.setOfferStatus(offerStatusService.getByStatusId(Long.valueOf(2)));
        of.setOfferedAt(new Date());

        offerRepository.save(of);
        /*o.setOfferStatus(offerStatus);
        User user = userRepository.findByUsername(offer.getUsername());
        o.setUser(user);

        o = offerRepository.save(o);
        offer.setId(o.getId());*/
        Company company2 = of.getCompanyProduct().getCompany();
        List<User> userList = userRepository.findByCompany(company2);
        Predicate<User> getYetkili = user -> user.getRole().getId() == Long.valueOf(1);

        List<User> result = userList.stream().filter(getYetkili)
                .collect(Collectors.toList());

        List<String> recipients = new ArrayList<>();
        result.forEach(u -> {
            recipients.add(u.getEmail());
        });
        String[] x = recipients.toArray(new String[recipients.size()]);
        String subject = "Offered by "+ company.getCompanyName();
        String mailBody= "There is an offer for this product: " + "\"" + of.getCompanyProduct().getProduct().getProductName() + "\" \n" +
                "Offered price: " + offer.getAskedPrice() + "\n" + "Offered amount: " + offer.getAskedAmount();

        sendEmail(subject,x ,mailBody);

        return offer;
    }

    @Override
    public OfferDto getById(Long id) {
        offer p = offerRepository.getOne(id);
        return modelMapper.map(p, OfferDto.class);
    }


    @Override
    public TPage<OfferDto> getAllPageable(Pageable pageable) {

        Page<offer> data = offerRepository.findAll(pageable);
        TPage<OfferDto> respnose = new TPage<OfferDto>();
        respnose.setStat(data, Arrays.asList(modelMapper.map(data.getContent(), OfferDto[].class)));
        return respnose;
    }


    @Override
    public Boolean delete(OfferDto offer) { return null; }

    public Boolean delete(Long id) {
        offerRepository.deleteById(id);
        return true;
    }

    @Override
    public OfferDto update(Long id, OfferDto offerdto) {
        offer offerDb = offerRepository.getOne(id);
        if (offerDb == null)
            throw new IllegalArgumentException("Offer Does Not Exist ID:" + id);

        offerRepository.save(offerDb);
        return modelMapper.map(offerDb, OfferDto.class);
    }

    @Override
    public List<OfferDto> getByCompanyId(Long id, String itemType) {

        Company company = companyService.getById(id);
        List<offer> offerList = offerRepository.findAll();

        if(itemType == "recieved")
        {
            Predicate<offer> getRecievedList = offer -> offer.getCompanyProduct().getCompany().getId() == id && offer.getOfferStatus().getId() == Long.valueOf(2);
            List<offer> result = offerList.stream().filter(getRecievedList)
                    .collect(Collectors.toList());
            List<OfferDto> resp = new ArrayList<>();

            result.forEach(of -> {
                /*
                CompanyDto companyDto = modelMapper.map(of.getCompany(), CompanyDto.class);
                CompanyProductDto companyProductDto = modelMapper.map(of.getCompanyProduct(), CompanyProductDto.class);
                OfferDto offerDto = modelMapper.map(of, OfferDto.class);
                offerDto.setCompanyDto(companyDto);
                offerDto.setCompanyProductDto(companyProductDto);
                */

                resp.add(modelMapper.map(of, OfferDto.class));
            });

            return resp;
        }
        return null;
    }

    @Override
    public List<OfferDto> getOffers(Long statusId, Long productCompanyId, Long offerCompanyId) {

        Predicate<offer> getRecievedList =
                offer -> (statusId == null || offer.getOfferStatus().getId() .equals( statusId)) &&
                        (productCompanyId == null || offer.getCompanyProduct().getCompany().getId().equals( productCompanyId)) &&
                        (offerCompanyId == null || offer.getCompany().getId().equals( offerCompanyId))
                ;

        List<offer> offerList = offerRepository.findAll() .stream().filter(getRecievedList)
                .collect(Collectors.toList());;


        List<OfferDto> resultList = new ArrayList<>();


        for (offer offer : offerList) {

            CompanyDto companyDto = modelMapper.map(offer.getCompany(), CompanyDto.class);
            CompanyProductDto companyProductDto = modelMapper.map(offer.getCompanyProduct(), CompanyProductDto.class);
            OfferDto offerDto = modelMapper.map(offer, OfferDto.class);
            offerDto.setCompanyDto(companyDto);
            offerDto.setCompanyProductDto(companyProductDto);



            resultList.add(offerDto);
        }

        return resultList;
    }

    //reject operation ------------------------------------------------------------------------
    @Override
    public OfferDto saveD(OfferDto offer) {

     /*   offer offer1 = new offer();
            offer1.setId(offer1.getId());
            offer1.setCompany(offer1.getCompany());
            offer1.setOfferStatus(offerStatusService.getByStatusId(Long.valueOf(4))); //rejected offer

        //send e-mail
        Company company2 = offer1.getCompanyProduct().getCompany();
        List<User> userList = userRepository.findByCompany(company2);
        Predicate<User> getYetkili = user -> user.getRole().getId() == Long.valueOf(1);

        List<User> result = userList.stream().filter(getYetkili)
                .collect(Collectors.toList());

        List<String> recipients = new ArrayList<>();
        result.forEach(u -> {
            recipients.add(u.getEmail());
        });

        String[] x = recipients.toArray(new String[recipients.size()]);
        String subject = "Your Offer Rejected by "+ offer1.getCompany().getCompanyName();
        String mailBody= "Rejected Product: " + "\"" + offer1.getCompanyProduct().getProduct().getProductName() + "\" \n" +
                "Rejected Price: " + offer.getAskedPrice() + "\n" + "Rejected Amount: " + offer.getAskedAmount();

        sendEmail(subject,x ,mailBody);

        //return offer;
        return modelMapper.map(offer, OfferDto.class);
        return offer1;*/
     return null;
    }

    @Override
    public void rejectOffer(Long id) {

        offer offer= offerRepository.findById(id).get();

        OfferStatus offerStatus = new OfferStatus();

        offerStatus.setId(4L);

        offer.setOfferStatus(offerStatus);
        offer.setRejectedAt(new Date());

        offerRepository.save(offer);

        Company company2 = offer.getCompany();
        List<User> userList = userRepository.findByCompany(company2);
        Predicate<User> getYetkili = user -> user.getRole().getId() == Long.valueOf(1);

        List<User> result = userList.stream().filter(getYetkili)
                .collect(Collectors.toList());

        List<String> recipients = new ArrayList<>();
        result.forEach(u -> {
            recipients.add(u.getEmail());
        });
        String[] x = recipients.toArray(new String[recipients.size()]);
        String subject = "Your offer is rejected by "+ offer.getCompanyProduct().getCompany().getCompanyName();
        String mailBody= "Company reject your offer to this product: " + "\"" + offer.getCompanyProduct().getProduct().getProductName() + "\" \n" +
                "Company reject your offered price: " + offer.getAskedPrice() + "\n" + "Company reject your offered amount: " + offer.getAskedAmount();

        sendEmail(subject,x ,mailBody);

    }

    @Override
    public void accepOffer(Long id) {

        offer offer= offerRepository.findById(id).get();

        OfferStatus offerStatus = new OfferStatus();

        offerStatus.setId(3L);

        offer.setOfferStatus(offerStatus);
        offer.setSoldAt(new Date());

        offerRepository.save(offer);

        CompanyProduct companyProduct = offer.getCompanyProduct();

        //stok - satılan miktar
        companyProduct.setProductAmount(companyProduct.getProductAmount()-offer.getAskedAmount());
        companyProductRepository.save(companyProduct);

        Company company2 = offer.getCompany();
        List<User> userList = userRepository.findByCompany(company2);
        Predicate<User> getYetkili = user -> user.getRole().getId() == Long.valueOf(1);

        List<User> result = userList.stream().filter(getYetkili)
                .collect(Collectors.toList());

        List<String> recipients = new ArrayList<>();
        result.forEach(u -> {
            recipients.add(u.getEmail());
        });
        String[] x = recipients.toArray(new String[recipients.size()]);
        String subject = "Your offer is accepted by "+ offer.getCompanyProduct().getCompany().getCompanyName();
        String mailBody= "Company accept your offer for this product: " + "\"" + offer.getCompanyProduct().getProduct().getProductName() + "\" \n" +
                "Company accept your offered price: " + offer.getAskedPrice() + "\n" + "Company accept your offered amount: " + offer.getAskedAmount();

        sendEmail(subject,x ,mailBody);

    }

    public List<OfferDto> getAll() {
        List<offer> data = offerRepository.findAll();
        return Arrays.asList(modelMapper.map(data, OfferDto[].class));
    }

    public List<OfferDto> getAllByUsername() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName);

        //List<offer> data = offerRepository.findByCompany(user);

        return null;// Arrays.asList(modelMapper.map(data, OfferDto[].class));
    }

}
