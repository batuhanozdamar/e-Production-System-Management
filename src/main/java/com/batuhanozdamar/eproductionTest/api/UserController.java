package com.batuhanozdamar.eproductionTest.api;

import com.batuhanozdamar.eproductionTest.dto.userDto;
import com.batuhanozdamar.eproductionTest.service.implementation.UserServiceImpl;
import com.batuhanozdamar.eproductionTest.util.ApiPaths;
import com.batuhanozdamar.eproductionTest.util.TPage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Pageable;
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
    @ApiOperation(value = "Get By Pagination Operation", response = userDto.class)
    public ResponseEntity<TPage<userDto>> getAllByPagination(Pageable pageable) {
        TPage<userDto> data = userServiceImpl.getAllPageable(pageable);
        return ResponseEntity.ok(data);
    }


    @GetMapping()
    @ApiOperation(value = "Get All By Operation", response = userDto.class)
    public ResponseEntity<List<userDto>> getAll() {
        List<userDto> data = userServiceImpl.getAll();
        return ResponseEntity.ok(data);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete Operation", response = Boolean.class)
    public ResponseEntity<Boolean> delete(@PathVariable(value = "id", required = true) Long id) {
        return ResponseEntity.ok(userServiceImpl.delete(id));
    }


    @GetMapping("/{id}")
    @ApiOperation(value = "Get By Id Operation", response = userDto.class)
    public ResponseEntity<userDto> getById(@PathVariable(value = "id", required = true) Long id) {
        userDto user = userServiceImpl.getById(id);
        return ResponseEntity.ok(user);
    }


    @PostMapping
    @ApiOperation(value = "Create Operation", response = userDto.class)
    public ResponseEntity<userDto> createUser(@Valid @RequestBody userDto user) {
        return ResponseEntity.ok(userServiceImpl.save(user));
    }
}
