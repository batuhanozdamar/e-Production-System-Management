package com.batuhanozdamar.eproductionTest.api;

import com.batuhanozdamar.eproductionTest.dto.CompanyDto;
import com.batuhanozdamar.eproductionTest.dto.UserDto;
import com.batuhanozdamar.eproductionTest.service.implementation.UserServiceImpl;
import com.batuhanozdamar.eproductionTest.util.ApiPaths;
import com.batuhanozdamar.eproductionTest.util.TPage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(ApiPaths.UserCtrl.CTRL)
@Api(value = ApiPaths.UserCtrl.CTRL, description = "User APIs")
@CrossOrigin("http://localhost:4200")
public class UserController {

    private final UserServiceImpl userServiceImpl;


    public UserController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }


    @GetMapping("/pagination")
    @ApiOperation(value = "Get By Pagination Operation", response = UserDto.class)
    public ResponseEntity<TPage<UserDto>> getAllByPagination(Pageable pageable) {
        TPage<UserDto> data = userServiceImpl.getAllPageable(pageable);
        return ResponseEntity.ok(data);
    }


    @GetMapping()
    @ApiOperation(value = "Get All By Operation", response = UserDto.class)
    public ResponseEntity<List<UserDto>> getAll() {
        List<UserDto> data = userServiceImpl.getAll();
        return ResponseEntity.ok(data);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete Operation", response = Boolean.class)
    public ResponseEntity<Boolean> delete(@PathVariable(value = "id", required = true) Long id) {
        return ResponseEntity.ok(userServiceImpl.delete(id));
    }


    @GetMapping("/{id}")
    @ApiOperation(value = "Get By Id Operation", response = UserDto.class)
    public ResponseEntity<UserDto> getById(@PathVariable(value = "id", required = true) Long id) {
        UserDto user = userServiceImpl.getById(id);
        return ResponseEntity.ok(user);
    }


    @PostMapping
    @ApiOperation(value = "Create Operation", response = UserDto.class)
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto user) {
        return ResponseEntity.ok(userServiceImpl.save(user));
    }

    @PostMapping("/addUserCompany")
    @ApiOperation(value = "Create With Company Operation", response = UserDto.class)
    public ResponseEntity<HttpStatus> createWithCompany(@Valid @RequestBody UserDto user)
    {
        userServiceImpl.createWithCompany(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/addUserCompany/{id}")
    @ApiOperation(value = "Get By Company Operation", response = UserDto.class)
    public ResponseEntity<List<UserDto>> getByCompany(@PathVariable(value = "id", required = true) Long id)
    {
        List<UserDto> data = userServiceImpl.getByCompany(id);
        return ResponseEntity.ok(data);
    }
}
