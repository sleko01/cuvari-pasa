package Primavara.rest.repository;

import Primavara.rest.domain.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    Activity findByActivityId(Long activity_id);
}
