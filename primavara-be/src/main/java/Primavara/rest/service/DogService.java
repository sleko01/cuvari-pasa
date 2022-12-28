package Primavara.rest.service;

import Primavara.rest.domain.Breed;
import Primavara.rest.domain.Dog;
import Primavara.rest.dto.RegisterDog;

import java.util.List;
import java.util.Optional;

public interface DogService {

    void addDog(RegisterDog registerDog, Long id);

    List<Optional<Dog>> getAllMyDogs(Long id);

    List<Breed> getAllBreeds();
}
