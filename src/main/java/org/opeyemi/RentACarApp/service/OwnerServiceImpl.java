package org.opeyemi.RentACarApp.service;

import org.opeyemi.RentACarApp.dto.OwnerDto;
import org.opeyemi.RentACarApp.dto.OwnerMapper;
import org.opeyemi.RentACarApp.entity.Owner;
import org.opeyemi.RentACarApp.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OwnerServiceImpl implements OwnerService {

    private final OwnerRepository ownerRepository;

    @Autowired
    public OwnerServiceImpl(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    @Override
    public ResponseEntity<OwnerDto> saveOwner(OwnerDto ownerDto) {
        try{
        Owner owner =  new Owner();
        OwnerMapper.updateOwnerFromDto(ownerDto, owner);
        if(ownerRepository.existsByEmail(owner.getEmail())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(OwnerMapper.toDto(owner));
        }
        ownerRepository.save(owner);
        return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @Override
    public ResponseEntity<OwnerDto> getOwner(Long id) {
        Optional<Owner> optionalOwner = ownerRepository.findById(id);
        OwnerDto ownerDto = optionalOwner.map(OwnerMapper::toDto).orElse(null);
        return ResponseEntity.ok(ownerDto);
    }

    @Override
    public ResponseEntity<OwnerDto> updateOwner(Long id, OwnerDto ownerDto) {
        Optional<Owner> optionalOwner = ownerRepository.findById(id);
        if(optionalOwner.isPresent()){
            Owner owner = optionalOwner.get();
            OwnerMapper.updateOwnerFromDto(ownerDto, owner);
            ownerRepository.save(owner);
            OwnerDto returnedOwnerDto = OwnerMapper.toDto(owner);
            return ResponseEntity.ok(returnedOwnerDto);
        }else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @Override
    public ResponseEntity<OwnerDto> deleteOwner(Long id) {
        Optional<Owner> optionalOwner = ownerRepository.findById(id);
        if(optionalOwner.isPresent()){
            Owner owner = optionalOwner.get();
            ownerRepository.delete(owner);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public Page<OwnerDto> getAllOwners(int offset, int size, String field) {
        return ownerRepository.findAll(PageRequest.of(offset, size).withSort(Sort.by(field)))
                .map(OwnerMapper::toDto);
    }


}
