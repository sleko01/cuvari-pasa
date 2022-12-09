package Primavara.rest.service;

import Primavara.rest.domain.RequestDog;

import java.util.List;
import java.util.Optional;

public interface RequestDogService {
    List<Optional<RequestDog>> getAllReviewedAndPublishedRequestDogs();
}
