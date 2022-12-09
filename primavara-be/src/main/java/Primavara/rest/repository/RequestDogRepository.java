package Primavara.rest.repository;


import Primavara.rest.domain.Breed;
import Primavara.rest.domain.RequestDog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RequestDogRepository extends JpaRepository<RequestDog, Long> {
    List<RequestDog> findAll();

    @Query(value = "SELECT * FROM request_dog r WHERE r.is_reviewed = true AND r.is_published = true",
    nativeQuery = true)
    List<Optional<RequestDog>> findAllReviewedAndPublished();

}
