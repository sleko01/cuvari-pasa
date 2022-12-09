package Primavara.rest.repository;

import Primavara.rest.domain.Breed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BreedRepository extends JpaRepository<Breed, Long> {
    Integer countByBreedId(Long id);
    Breed findByBreedId(Long id);
}
