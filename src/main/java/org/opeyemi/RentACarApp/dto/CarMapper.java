package org.opeyemi.RentACarApp.dto;

import lombok.Data;
import org.opeyemi.RentACarApp.entity.Car;
import org.springframework.stereotype.Component;

@Data
@Component
public class CarMapper {

    public CarDto toDto(Car car) {
        CarDto carDto = new CarDto();
        carDto.setCarId(car.getCarId());
        carDto.setMake(car.getMake());
        carDto.setModel(car.getModel());
        carDto.setYear(car.getYear());
        carDto.setColor(car.getColor());
        carDto.setEngine(car.getEngine());
        carDto.setFuel(car.getFuel());
        carDto.setTransmission(car.getTransmission());
        carDto.setPrice(car.getPrice());
        carDto.setReturnedImage(car.getImage());
        carDto.setLastUpdated(car.getLastUpdated());
        return carDto;
    }

    public void toEntity(CarDto carDto, Car car) {
        car.setMake(carDto.getMake());
        car.setModel(carDto.getModel());
        car.setYear(carDto.getYear());
        car.setColor(carDto.getColor());
        car.setEngine(carDto.getEngine());
        car.setFuel(carDto.getFuel());
        car.setTransmission(carDto.getTransmission());
        car.setPrice(carDto.getPrice());
    }
}
