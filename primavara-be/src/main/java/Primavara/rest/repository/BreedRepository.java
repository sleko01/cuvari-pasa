package Primavara.rest.repository;

import Primavara.rest.domain.Breed;
import Primavara.rest.domain.Dog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BreedRepository extends JpaRepository<Breed, Long> {
    Integer countByBreedId(Long id);
    Breed findByBreedId(Long id);
    List<Breed> findAll();

    @Query(value = "SELECT * FROM breed b ORDER BY name",
            nativeQuery = true)
    List<Optional<Breed>> findAllSorted();
}
