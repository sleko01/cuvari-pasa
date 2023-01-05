package Primavara.rest.service;

import Primavara.rest.domain.RequestDog;
import Primavara.rest.dto.NewRequestDog;

import java.util.List;
import java.util.Optional;

public interface RequestDogService {
    List<Optional<RequestDog>> getAllReviewedAndPublishedRequestDogs();

    List<Optional<RequestDog>> getAllReviewedAndPublishedRequestDogsAndNotInitiatedByMe(Long id);

    void addNewRequestDog(NewRequestDog newRequestDog, Long id);

    List<Optional<RequestDog>> getAllRequestDogsByUserId(Long id);


}
