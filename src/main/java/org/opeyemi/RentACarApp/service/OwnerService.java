package org.opeyemi.RentACarApp.service;

import org.opeyemi.RentACarApp.dto.OwnerDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OwnerService {
    ResponseEntity<OwnerDto> saveOwner(OwnerDto ownerDto);
    ResponseEntity<OwnerDto> getOwner(Long ownerId);
    ResponseEntity<OwnerDto> updateOwner(Long ownerId, OwnerDto ownerDto);
    ResponseEntity<OwnerDto> deleteOwner(Long ownerId);
    Page<OwnerDto> getAllOwners(int offset, int size, String field);
}
