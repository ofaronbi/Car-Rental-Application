package org.opeyemi.RentACarApp.controller;

import org.opeyemi.RentACarApp.dto.CarDto;
import org.opeyemi.RentACarApp.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("v1/api")
@CrossOrigin("${origin}")
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping("/post/car")
    public ResponseEntity<CarDto> postCar(@ModelAttribute CarDto carDto) throws IOException{
        return carService.postCar(carDto);
    }

    @PutMapping("/update/car/{carId}")
    public ResponseEntity<CarDto> updateCar(@PathVariable Long carId,
                                            @ModelAttribute CarDto carDto) throws IOException{
        return carService.updateCar(carId, carDto);
    }

    @DeleteMapping("/delete/car/{carId}")
    public ResponseEntity<CarDto> deleteCar(@PathVariable Long carId){
        return carService.deleteCar(carId);
    }

    @GetMapping("car/{carId}")
    public ResponseEntity<CarDto> getCar(@PathVariable Long carId){
        return carService.getCar(carId);
    }


    @GetMapping("/cars")
    public Page<CarDto> getAllCars(@RequestParam(defaultValue = "") String searchText,
                                   @RequestParam(required = false) Integer pageNumber,
                                   @RequestParam(required = false) Integer pageSize){
        Pageable pageable;
        if (pageNumber != null && pageSize != null) {
            pageable = PageRequest.of(pageNumber, pageSize);
        } else {
            pageable = PageRequest.of(0, 8);
        }
        return carService.getAllCars(searchText,pageable);
    }

//    @GetMapping("/search")
//    public Page<CarDto> findCarBySearchText(@RequestParam String searchText,
//                                            @RequestParam(required = false) Integer pageNumber,
//                                            @RequestParam(required = false) Integer pageSize){
//        Pageable pageable;
//        if (pageNumber != null && pageSize != null) {
//            pageable = PageRequest.of(pageNumber, pageSize);
//        } else {
//            pageable = PageRequest.of(0, 10);
//        }
//        return carService.findCarBySearchText(searchText, pageable);
//    }

}
