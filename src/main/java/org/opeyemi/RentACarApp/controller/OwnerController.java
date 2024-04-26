package org.opeyemi.RentACarApp.controller;

import org.opeyemi.RentACarApp.dto.OwnerDto;
import org.opeyemi.RentACarApp.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("v1/api")
@CrossOrigin("${origin}")
public class OwnerController {

    private final OwnerService ownerService;

    @Autowired
    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @PostMapping("/saveOwner")
    public ResponseEntity<OwnerDto> saveOwner(@RequestBody OwnerDto ownerDto){
        return ownerService.saveOwner(ownerDto);
    }

    @GetMapping("/getOwner/{ownerId}")
    public ResponseEntity<OwnerDto> getOwner(@PathVariable(name = "ownerId") Long ownerId){
        return ownerService.getOwner(ownerId);
    }

    @PutMapping("/updateOwner/{ownerId}")
    public ResponseEntity<OwnerDto> updateOwner(@PathVariable Long ownerId, OwnerDto ownerDto){
        return ownerService.updateOwner(ownerId, ownerDto);
    }

    @DeleteMapping("/deleteOwner/{ownerId}")
    public ResponseEntity<OwnerDto> deleteOwner(@PathVariable Long ownerId){
        return ownerService.deleteOwner(ownerId);
    }

    @GetMapping("/allOwners/{offset}/{size}/{field}")
    public Page<OwnerDto> getAllOwners(@PathVariable int offset,
                                       @PathVariable int size, @PathVariable String field){
        return ownerService.getAllOwners(offset, size, field);
    }


}
