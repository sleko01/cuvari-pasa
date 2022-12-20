package Primavara.rest.repository;

import Primavara.rest.domain.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    Activity findByActivityId(Long activity_id);

    List<Activity> findAll();
}
