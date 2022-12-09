package Primavara.rest.service;

import Primavara.rest.domain.RequestDog;

import java.util.Optional;

public interface RequestDogService {
    Optional<RequestDog> getAllReviewedAndPublishedRequestDogs();
}
