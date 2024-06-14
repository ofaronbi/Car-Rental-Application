package org.opeyemi.RentACarApp.service;

import jakarta.transaction.Transactional;
import org.opeyemi.RentACarApp.dto.CarDto;
import org.opeyemi.RentACarApp.dto.CarMapper;
import org.opeyemi.RentACarApp.entity.Car;
import org.opeyemi.RentACarApp.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;
    private final CarMapper carMapper;


    @Autowired
    public CarServiceImpl(CarRepository carRepository, CarMapper carMapper) {
        this.carRepository = carRepository;
        this.carMapper = carMapper;
    }

    @Override
    public ResponseEntity<CarDto> postCar(CarDto carDto)throws IOException{
        try{
            Car car = new Car();
            carMapper.toEntity(carDto, car);
            car.setImage(carDto.getImage().getBytes());
            carRepository.save(car);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Override
    public ResponseEntity<CarDto> updateCar(Long carId, CarDto carDto) throws IOException {
        Optional<Car> car = carRepository.findById(carId);
        if(car.isPresent()){
            Car existingCar = car.get();
            if(carDto.getImage() != null){
                existingCar.setImage(carDto.getImage().getBytes());
            }
            carMapper.toEntity(carDto, existingCar);
            carRepository.save(existingCar);
            return ResponseEntity.ok().build();
        }else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @Override
    public ResponseEntity<CarDto> deleteCar(Long carId) {
        carRepository.deleteById(carId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<CarDto> getCar(Long id) {
        Optional<Car> foundCar = carRepository.findById(id);
        CarDto carDto = foundCar.map(carMapper::toDto).orElse(null);
        return ResponseEntity.ok(carDto);
    }

    @Override
    public Page<CarDto> getAllCars(String searchText,Pageable pageable) {
        if(searchText != null && !searchText.isEmpty()){
            return carRepository.findCarBySearchText(searchText, pageable).map(carMapper::toDto);
        }
        return carRepository.findAll(pageable).map(carMapper::toDto);
    }

}
