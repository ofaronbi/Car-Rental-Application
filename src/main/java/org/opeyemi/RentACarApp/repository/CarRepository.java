package org.opeyemi.RentACarApp.repository;

import org.opeyemi.RentACarApp.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long> {
}
