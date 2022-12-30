package Primavara.rest.repository;

import Primavara.rest.domain.RequestGuardian;
import Primavara.rest.domain.RequestGuardiansDog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestGuardiansDogRepository extends JpaRepository<RequestGuardiansDog, Long> {

    @Query(value = "SELECT dog_id FROM request_guardians_dog r WHERE r.request_guardian_id = :i", nativeQuery = true)
    List<Long> findALlIdsByRequestGuardianId(@Param("i") Long id);

    @Query(value = "SELECT dog_id FROM request_guardians_dog WHERE request_guardian_id = :i", nativeQuery = true)
    List<Long> findAllDogIdByRequestGuardianId(@Param("i") Long id);
}
