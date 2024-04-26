package org.opeyemi.RentACarApp.repository;

import org.opeyemi.RentACarApp.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
    boolean existsByEmail(String email);
}
