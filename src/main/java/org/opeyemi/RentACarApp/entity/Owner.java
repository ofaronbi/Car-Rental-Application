package org.opeyemi.RentACarApp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CarOwner")
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ownerId;
    private String firstName;
    private String lastName;
    @Column(unique = true, nullable = false)
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zip;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Car> cars;
}
