package Primavara.rest.repository;

import Primavara.rest.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Integer countByUsername(String username);
    Integer countByEmail(String email);
    AppUser findByUsername(String username);
    AppUser findByUserId(Long id);

    @Query(value = "SELECT * FROM appuser a WHERE a.user_id != :i", nativeQuery = true)
    List<Optional<AppUser>> findAllExceptCurrentUser(@Param("i") Long id);
}
