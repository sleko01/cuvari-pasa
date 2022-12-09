package Primavara.rest.controller;

import Primavara.rest.domain.RequestDog;
import Primavara.rest.dto.NewRequestDog;
import Primavara.rest.dto.RegisterUser;
import Primavara.rest.service.RequestDogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("reqdog")
public class RequestDogController {
    @Autowired
    private RequestDogService requestDogService;

    @GetMapping("")
    private List<Optional<RequestDog>> getAllReviewedAndPublishedRequestDogs() {
        return requestDogService.getAllReviewedAndPublishedRequestDogs();
    }

    @PostMapping("new")
    private void addNewRequestDog (@RequestBody NewRequestDog newRequestDog) {requestDogService.addNewRequestDog(newRequestDog);}

}
