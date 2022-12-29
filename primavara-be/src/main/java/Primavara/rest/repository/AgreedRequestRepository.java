package Primavara.rest.repository;

import Primavara.rest.domain.AgreedRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgreedRequestRepository extends JpaRepository<AgreedRequest, Long> {

    Long countByAgreedRequestId(Long id);

    AgreedRequest findByAgreedRequestId(Long id);
}
