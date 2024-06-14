package org.opeyemi.RentACarApp.repository;

import org.opeyemi.RentACarApp.entity.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CarRepository extends JpaRepository<Car, Long> {
    @Query("SELECT a FROM Car a WHERE " +
            "CONCAT(LOWER(a.make), LOWER(a.model), LOWER(a.year), STR(a.price))"+
            " LIKE %?1%")
    Page<Car> findCarBySearchText(String searchText, Pageable pageable);
}
