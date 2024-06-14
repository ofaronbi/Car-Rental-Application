package org.opeyemi.RentACarApp.service;

import org.opeyemi.RentACarApp.dto.CarDto;
import org.opeyemi.RentACarApp.entity.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface CarService {
    ResponseEntity<CarDto> postCar(CarDto carDto)throws IOException;
    ResponseEntity<CarDto> updateCar(Long carId, CarDto carDto) throws IOException;
    ResponseEntity<CarDto> deleteCar(Long id);
    ResponseEntity<CarDto> getCar(Long id);
    Page<CarDto> getAllCars(String searchText,Pageable pageable);
}
