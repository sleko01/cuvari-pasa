package Primavara.rest.repository;

import Primavara.rest.domain.Dog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DogRepository extends JpaRepository<Dog, Long> {
    @Query(value = "SELECT * FROM dog d WHERE d.user_id = :s",
            nativeQuery = true)
    List<Optional<Dog>> findAllAppUsersDogs(@Param("s") Long id);

    @Query(value = "SELECT dog_id FROM dog d WHERE d.user_id = :s",
            nativeQuery = true)
    List<Long> findAllAppUsersDogsId(@Param("s") Long id);

    @Query(value = "SELECT COUNT(*) FROM dog d WHERE d.user_id = :i AND d.name = :n",
            nativeQuery = true)
    Integer countAllAppUsersDogsWithName(@Param("i") Long id, @Param("n") String name);

    Dog findByDogId(Long dog_id);

    @Query(value = "SELECT user_id FROM dog d WHERE d.dog_id=:i", nativeQuery = true)
    Long findUserIdByDogId(@Param("i") Long dog_id);

    @Query(value = "SELECT photo FROM dog d WHERE d.dog_id=:i", nativeQuery = true)
    String getPhotoById(@Param("i") Long dog_id);
}
