package Primavara.rest.repository;

import Primavara.rest.domain.RequestGuardian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RequestGuardianRepository extends JpaRepository<RequestGuardian, Long> {
    List<RequestGuardian> findAll();

    @Query(value = "SELECT * FROM request_guardian r WHERE r.is_reviewed = true AND r.is_published = true",
    nativeQuery = true)
    List<Optional<RequestGuardian>> findAllReviewedAndPublished();

    @Query(value= "SELECT * FROM request_guardian r WHERE r.user_id = :i", nativeQuery = true)
    List<Optional<RequestGuardian>> findAllByUserId(@Param("i") Long user_id);
}
