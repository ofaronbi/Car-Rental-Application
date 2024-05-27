package org.opeyemi.RentACarApp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Car")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;
    private String make;
    private String model;
    private String year;
    private String color;
    private String engine;
    private String fuel;
    private String transmission;
    private Long price;

    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    @UpdateTimestamp
    private LocalDateTime lastUpdated;
}
