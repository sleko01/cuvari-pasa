package Primavara.rest.repository;


import Primavara.rest.domain.RequestDog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestDogRepository extends JpaRepository<RequestDog, Long> {

    List<RequestDog> findAll();
}
