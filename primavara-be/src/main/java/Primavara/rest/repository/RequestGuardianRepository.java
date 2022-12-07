package Primavara.rest.repository;

import Primavara.rest.domain.RequestGuardian;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestGuardianRepository extends JpaRepository<RequestGuardian, Long> {
    List<RequestGuardian> findAll();

}
