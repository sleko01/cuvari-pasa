package Primavara.rest.service;

import Primavara.rest.domain.Breed;
import Primavara.rest.domain.RequestDog;
import Primavara.rest.dto.NewRequestDog;
import Primavara.rest.dto.RegisterUser;

import java.util.List;
import java.util.Optional;

public interface RequestDogService {
    List<Optional<RequestDog>> getAllReviewedAndPublishedRequestDogs();

    void addNewRequestDog(NewRequestDog newRequestDog, Long id);
}
