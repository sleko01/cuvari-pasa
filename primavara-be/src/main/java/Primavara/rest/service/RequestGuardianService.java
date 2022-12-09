package Primavara.rest.service;

import Primavara.rest.domain.RequestGuardian;

import java.util.List;
import java.util.Optional;

public interface RequestGuardianService {
    List<Optional<RequestGuardian>> getAllReviewedAndPublishedRequestGuardians();
}
