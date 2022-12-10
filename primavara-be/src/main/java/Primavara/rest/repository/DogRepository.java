package Primavara.rest.repository;

import Primavara.rest.domain.AppUser;
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

    @Query(value = "SELECT COUNT(*) FROM dog d WHERE d.user_id = :i AND d.name = :n",
            nativeQuery = true)
    Integer countAllAppUsersDogsWithName(@Param("i") Long id, @Param("n") String name);

    Dog findByDogId(Long dog_id);
}
