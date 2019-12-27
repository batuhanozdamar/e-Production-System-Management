package com.batuhanozdamar.eproductionTest.api;

import com.batuhanozdamar.eproductionTest.dto.CategoryDto;
import com.batuhanozdamar.eproductionTest.dto.RoleDto;
import com.batuhanozdamar.eproductionTest.service.implementation.CategoryServiceImpl;
import com.batuhanozdamar.eproductionTest.service.implementation.RoleServiceImpl;
import com.batuhanozdamar.eproductionTest.util.ApiPaths;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.RoleCtrl.CTRL)
@Api(value = ApiPaths.RoleCtrl.CTRL, description = "Role APIs")
@CrossOrigin("http://localhost:4200")
public class RoleController {

    private final RoleServiceImpl roleServiceImpl;

    public RoleController(RoleServiceImpl roleServiceImpl) {
        this.roleServiceImpl = roleServiceImpl;
    }

    @GetMapping("/{selectable}")
    @ApiOperation(value = "Get All Operation", response = RoleDto.class , responseContainer = "List")
    public ResponseEntity<List<RoleDto>> getSelectableRoles(@PathVariable(value = "selectable", required = true) int selectable) {
        if(selectable == 1)
        {
            List<RoleDto> data = roleServiceImpl.findAllBySelectable(false);
            return ResponseEntity.ok(data);
        }
        else
        {
            List<RoleDto> data = roleServiceImpl.findAllBySelectable(true);
            return ResponseEntity.ok(data);
        }
    }
}
