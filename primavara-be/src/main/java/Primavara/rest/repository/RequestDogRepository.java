package Primavara.rest.repository;


import Primavara.rest.domain.RequestDog;
import Primavara.rest.domain.RequestGuardian;
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

    @Query(value = "SELECT * FROM request_dog r WHERE r.is_reviewed = true AND r.is_published = true and r.request_dog_id not in (\n" +
            "\tSELECT request_dog_id\n" +
            "\tFROM agreed_request\n" +
            "\tWHERE is_agreed = true and request_dog_id is not null\n" +
            ")", nativeQuery = true)
    List<Optional<RequestDog>> findAllReviewedAndPublishedAndNotGone();

    @Query(value = "SELECT * FROM request_dog r WHERE r.is_reviewed = true AND r.is_published = true and r.request_dog_id not in (\n" +
            "\tSELECT request_dog_id\n" +
            "\tFROM agreed_request\n" +
            "\tWHERE is_agreed = true and request_dog_id is not null\n" +
            ") and r.user_id = :i", nativeQuery = true)
    List<Optional<RequestDog>> findAllReviewedAndPublishedAndNotGoneAndMine(@Param("i") Long id);

    @Query(value = "SELECT * FROM request_dog r WHERE r.is_reviewed = true AND r.is_published = true and r.request_dog_id not in (\n" +
            "\tSELECT request_dog_id\n" +
            "\tFROM agreed_request\n" +
            "\tWHERE is_agreed = true and request_dog_id is not null\n" +
            ") and (:i, request_dog_id) not in (" +
            "\tSELECT initiator_user_id, request_dog_id\n" +
            "\tFROM agreed_request\n" +
            "WHERE initiator_user_id = :i and initiator_user_id is not null and request_dog_id is not null)", nativeQuery = true)
    List<Optional<RequestDog>> findAllReviewedAndPublishedAndNotGoneAndNotInitiatedByMe(@Param("i") Long id);

    @Query(value = "SELECT * FROM request_dog r WHERE r.user_id = :i", nativeQuery = true)
    List<Optional<RequestDog>> findAllByUserId(@Param("i") Long user_id);

    @Query(value = "SELECT * FROM request_dog r WHERE r.is_reviewed = false", nativeQuery = true)
    List<RequestDog> findAllNotReviewed();

    @Query(value = "SELECT * FROM request_dog r WHERE r.is_reviewed = false AND r.user_id = :i", nativeQuery = true)
    List<RequestDog> findAllMyNotReviewed(@Param("i") Long user_id);

    RequestDog findByRequestDogId(Long id);

    Long countByRequestDogId(Long id);

    @Query(value = "SELECT *\n" +
            "FROM request_dog as r\n" +
            "WHERE r.is_reviewed = true and r.is_published = true and r.user_id <> :i and r.request_dog_id not in (\n" +
            "\tSELECT request_dog_id\n" +
            "\tFROM agreed_request\n" +
            "\tWHERE is_agreed = true and request_dog_id is not null\n" +
            ")", nativeQuery = true)
    List<Optional<RequestDog>> findAllReviewedAndPublishedAndNotMineAndNotAgreed(@Param("i") Long user_id);

}
