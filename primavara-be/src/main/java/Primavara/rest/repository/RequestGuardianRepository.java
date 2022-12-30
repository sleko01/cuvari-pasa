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

    @Query(value = "SELECT * FROM request_guardian r WHERE r.is_reviewed = false", nativeQuery = true)
    List<RequestGuardian> findAllNotReviewed();

    @Query(value = "SELECT * FROM request_guardian r WHERE r.is_reviewed = false AND r.user_id = :i", nativeQuery = true)
    List<RequestGuardian> findAllMyNotReviewed(@Param("i") Long user_id);

    RequestGuardian findByRequestGuardianId(Long id);

    Long countByRequestGuardianId(Long id);

    @Query(value = "SELECT *\n" +
                    "FROM request_guardian as r\n" +
                    "WHERE r.is_reviewed = true and r.is_published = true and r.user_id <> :i and r.request_guardian_id not in (\n" +
                    "\tSELECT request_guardian_id\n" +
                    "\tFROM agreed_request\n" +
                    "\tWHERE is_agreed = true\n" +
                    ")", nativeQuery = true)
    List<Optional<RequestGuardian>> findAllReviewedAndPublishedAndNotMineAndNotAgreed(@Param("i") Long user_id);
}
