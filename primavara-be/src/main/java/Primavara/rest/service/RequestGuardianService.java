package Primavara.rest.service;

import Primavara.rest.domain.RequestGuardian;
import Primavara.rest.dto.NewRequestGuardian;

import java.util.List;
import java.util.Optional;

public interface RequestGuardianService {
    List<Optional<RequestGuardian>> getAllReviewedAndPublishedRequestGuardians();

    List<Optional<RequestGuardian>> getAllReviewedAndPublishedRequestGuardiansAndNotInitiatedByMe(Long id);

    void addNewRequestGuardian(NewRequestGuardian newRequestGuardian, Long id);

    List<Optional<RequestGuardian>> getAllRequestGuardiansByUserId(Long id);

    List<Optional<RequestGuardian>> getAllReviewedAndPublishedRequestGuardiansAndMine(Long id);

    RequestGuardian findByRequestGuardianId(Long id);
}
