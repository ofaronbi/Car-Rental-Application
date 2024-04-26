package org.opeyemi.RentACarApp.dto;

import lombok.Data;

@Data
public class OwnerDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zip;
}
