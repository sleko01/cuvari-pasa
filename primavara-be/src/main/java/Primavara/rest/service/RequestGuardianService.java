package Primavara.rest.service;

import Primavara.rest.domain.RequestGuardian;

import java.util.Optional;

public interface RequestGuardianService {
    Optional<RequestGuardian> getAllReviewedAndPublishedRequestGuardians();
}
