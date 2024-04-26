package org.opeyemi.RentACarApp.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
public class CarDto {
    private Long carId;
    private String make;
    private String model;
    private String year;
    private String color;
    private String engine;
    private String fuel;
    private String transmission;
    private Long price;
    private MultipartFile image;
    private byte[] returnedImage;
    private LocalDateTime lastUpdated;


}
