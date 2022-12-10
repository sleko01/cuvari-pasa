package Primavara.rest.service;

import Primavara.rest.domain.RequestGuardian;
import Primavara.rest.dto.NewRequestDog;
import Primavara.rest.dto.NewRequestGuardian;

import java.util.List;
import java.util.Optional;

public interface RequestGuardianService {
    List<Optional<RequestGuardian>> getAllReviewedAndPublishedRequestGuardians();

    void addNewRequestGuardian(NewRequestGuardian newRequestGuardian, Long id);
}
