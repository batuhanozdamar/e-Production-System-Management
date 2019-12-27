package com.batuhanozdamar.eproductionTest.service.implementation;

import com.batuhanozdamar.eproductionTest.dto.*;
import com.batuhanozdamar.eproductionTest.entity.*;
import com.batuhanozdamar.eproductionTest.repository.CompanyProductRepository;
import com.batuhanozdamar.eproductionTest.repository.userRepository;
import com.batuhanozdamar.eproductionTest.service.CompanyProductService;
import com.batuhanozdamar.eproductionTest.service.OfferStatusService;
import com.batuhanozdamar.eproductionTest.util.TPage;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class CompanyProductImpl implements CompanyProductService {

    private final CompanyProductRepository companyProductRepository;
    private final CompanyServiceImpl companyService;
    private final ModelMapper modelMapper;
    private final productServiceImpl productService;
    private final userRepository userRepository;
    private final offerServiceImpl offerServiceImpl;
    private final OfferStatusService offerStatusService;

    public CompanyProductImpl(CompanyProductRepository companyProductRepository, CompanyServiceImpl companyService, userRepository userRepository, ModelMapper modelMapper, productServiceImpl productService, com.batuhanozdamar.eproductionTest.service.implementation.offerServiceImpl offerServiceImpl, OfferStatusService offerStatusService) {
        this.companyProductRepository = companyProductRepository;
        this.companyService = companyService;
        this.modelMapper = modelMapper;
        this.userRepository= userRepository;
        this.productService = productService;
        this.offerServiceImpl = offerServiceImpl;
        this.offerStatusService = offerStatusService;
    }


    @Override
    public CompanyProductDto save(CompanyProductDto companyProductDto) {

        product product = modelMapper.map(productService.getById(companyProductDto.getProduct().getId()), product.class);
        Company company = modelMapper.map(companyService.getById(companyProductDto.getCompany().getId()), Company.class);
        CompanyProduct companyProduct = new CompanyProduct();
        companyProduct.setCompany(company);
        companyProduct.setProduct(product);
        companyProduct.setProductAmount(companyProductDto.getProductAmount());
        companyProduct.setStockOnHand(companyProductDto.getProductAmount());
        companyProduct.setProductPrice(companyProductDto.getProductPrice());
        companyProduct.setProductColor(companyProductDto.getProductColor());
        companyProduct.setProductCode(companyProductDto.getProductCode());
        companyProductRepository.save(companyProduct);
        return modelMapper.map(companyProduct, CompanyProductDto.class);
        /*CompanyProduct companyProduct = modelMapper.map(companyProductDto, CompanyProduct.class);

        User user  = userRepository.findByUsername(companyProductDto.getUser().getUsername());

        companyProduct.setUser(user);
        companyProduct.setCompany(user.getCompany());
        companyProduct = companyProductRepository.save(companyProduct);

        return companyProductDto;*/
    }

    @Override
    public CompanyProductDto getById(Long id) {
        return null;
    }

    @Override
    public CompanyProductDto getByCompany(CompanyProductDto companyProduct) {
        return null;
    }

    @Override
    public TPage<CompanyProductDto> getAllPageable(Pageable pageable) {
        return null;
    }

    @Override
    public List<CompanyProductDto> getAllByCompanyName() {
        return null;
    }

    @Override
    public List<CompanyProductDto> getAll(Long id) {
        Company company = companyService.getById(id);
        List<CompanyProduct> data = companyProductRepository.findByCompany(company);
        return Arrays.asList(modelMapper.map(data, CompanyProductDto [].class));
    }

    @Override
    public Boolean delete(CompanyProductDto companyProduct) {
        return null;
    }

    //update company product
    @Override
    public CompanyProductDto update(Long id, CompanyProductDto companyProductDto) {

        product product = modelMapper.map(productService.getById(companyProductDto.getProduct().getId()), product.class);
        Company company = modelMapper.map(companyService.getById(companyProductDto.getCompany().getId()), Company.class);
        CompanyProduct companyProduct = new CompanyProduct();
        companyProduct.setId(id);
        companyProduct.setCompany(company);
        companyProduct.setProduct(product);
        companyProduct.setProductAmount(companyProductDto.getProductAmount());
        companyProduct.setStockOnHand(companyProductDto.getProductAmount());
        companyProduct.setProductPrice(companyProductDto.getProductPrice());
        companyProduct.setProductColor(companyProductDto.getProductColor());
        companyProduct.setProductCode(companyProductDto.getProductCode());
        companyProductRepository.save(companyProduct);
        return modelMapper.map(companyProduct, CompanyProductDto.class);
    }

    @Override
    public List<procurementDto> getAllProducts(Long id) {
        Company company = companyService.getById(id);


        List<CompanyProduct> data = companyProductRepository.findAll();

        // List filtering by Company.
        Predicate<CompanyProduct> notThisCompany = companyProduct -> companyProduct.getCompany() != company && companyProduct.getProductAmount() > 0;

        List<CompanyProduct> result = data.stream().filter(notThisCompany)
                .collect(Collectors.toList());

        List<procurementDto> resp = new ArrayList<>();
        result.forEach(pro -> {
            procurementDto procurementDto  = new procurementDto();
            offer offer = offerServiceImpl.getById(company, pro);
            if(offer == null)
            {
                OfferStatusDto offerStatusDto = modelMapper.map(offerStatusService.getByStatusId(Long.valueOf(5)), OfferStatusDto.class);
                procurementDto.setOfferStatusDto(offerStatusDto);
                procurementDto.setId(null);
            }
            else
            {
                OfferStatusDto offerStatusDto = modelMapper.map(offer.getOfferStatus(), OfferStatusDto.class);
                procurementDto.setOfferStatusDto(offerStatusDto);
                procurementDto.setId(offer.getId());
            }
            procurementDto.setCompanyProductDto(modelMapper.map(pro, CompanyProductDto.class));
            procurementDto.setCompany(modelMapper.map(pro.getCompany(), CompanyDto.class));
            procurementDto.setProduct(modelMapper.map(pro.getProduct(), ProductDto.class));
            procurementDto.setProductAmount(pro.getProductAmount());
            procurementDto.setProductCode(pro.getProductCode());
            procurementDto.setProductPrice(pro.getProductPrice());
            procurementDto.setStockOnHand(pro.getStockOnHand());
            procurementDto.setProductColor(pro.getProductColor());
            resp.add(procurementDto);
        });


        return resp;




    }

    @Override
    public List<procurementDto> getAllProductsByCategory(Long id, Long categoryId) {
        Company company = companyService.getById(id);


        List<CompanyProduct> data = companyProductRepository.findAll();

        // List filtering by Company.
        Predicate<CompanyProduct> notThisCompany = companyProduct -> companyProduct.getCompany() != company && companyProduct.getProduct().getCategory().getValue().equals(categoryId) && companyProduct.getProductAmount() > 0;

        List<CompanyProduct> result = data.stream().filter(notThisCompany)
                .collect(Collectors.toList());

        List<procurementDto> resp = new ArrayList<>();
        result.forEach(pro -> {
            procurementDto procurementDto  = new procurementDto();
            offer offer = offerServiceImpl.getById(company, pro);
            if(offer == null)
            {
                OfferStatusDto offerStatusDto = modelMapper.map(offerStatusService.getByStatusId(Long.valueOf(5)), OfferStatusDto.class);
                procurementDto.setOfferStatusDto(offerStatusDto);
                procurementDto.setId(null);
            }
            else
            {
                OfferStatusDto offerStatusDto = modelMapper.map(offer.getOfferStatus(), OfferStatusDto.class);
                procurementDto.setOfferStatusDto(offerStatusDto);
                procurementDto.setId(offer.getId());
            }
            procurementDto.setCompanyProductDto(modelMapper.map(pro, CompanyProductDto.class));
            procurementDto.setCompany(modelMapper.map(pro.getCompany(), CompanyDto.class));
            procurementDto.setProduct(modelMapper.map(pro.getProduct(), ProductDto.class));
            procurementDto.setProductAmount(pro.getProductAmount());
            procurementDto.setProductCode(pro.getProductCode());
            procurementDto.setProductPrice(pro.getProductPrice());
            procurementDto.setStockOnHand(pro.getStockOnHand());
            procurementDto.setProductColor(pro.getProductColor());
            resp.add(procurementDto);


        });
        return resp;
    }


    //Delete Operation Here...
    public Boolean delete(Long companyProductID) {
        companyProductRepository.deleteById(companyProductID);
        return true;
    }
}
