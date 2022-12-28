package Primavara.rest.controller;

import Primavara.rest.domain.Breed;
import Primavara.rest.domain.Dog;
import Primavara.rest.dto.RegisterDog;
import Primavara.rest.service.DogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("dogs")
public class DogController {

    @Autowired
    private DogService dogService;

    @PutMapping("register/{id}")
    public void addDog(@RequestBody RegisterDog registerDog, @PathVariable(required = true) Long id){
        dogService.addDog(registerDog, id);
    }

    @GetMapping("my/{id}")
    public List<Optional<Dog>> getAllMyDogs(@PathVariable(required = true) Long id) {
        return dogService.getAllMyDogs(id);
    }

    @GetMapping("breeds")
    public List<Breed> getAllBreeds() {
        return dogService.getAllBreeds();
    }
}
