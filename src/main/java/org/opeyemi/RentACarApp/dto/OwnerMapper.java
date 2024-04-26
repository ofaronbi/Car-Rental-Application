package org.opeyemi.RentACarApp.dto;

import org.opeyemi.RentACarApp.entity.Owner;


public class OwnerMapper {

    public static OwnerDto toDto(Owner owner) {
            OwnerDto ownerDto = new OwnerDto();
            ownerDto.setFirstName(owner.getFirstName());
            ownerDto.setLastName(owner.getLastName());
            ownerDto.setEmail(owner.getEmail());
            ownerDto.setPhone(owner.getPhone());
            ownerDto.setAddress(owner.getAddress());
            ownerDto.setCity(owner.getCity());
            ownerDto.setState(owner.getState());
            ownerDto.setZip(owner.getZip());
            return ownerDto;
        }

        public static void updateOwnerFromDto(OwnerDto ownerDto, Owner owner) {
            owner.setFirstName(ownerDto.getFirstName());
            owner.setLastName(ownerDto.getLastName());
            owner.setEmail(ownerDto.getEmail());
            owner.setPhone(ownerDto.getPhone());
            owner.setAddress(ownerDto.getAddress());
            owner.setCity(ownerDto.getCity());
            owner.setState(ownerDto.getState());
            owner.setZip(ownerDto.getZip());
        }
}
