package Primavara.rest.controller;

import Primavara.rest.domain.RequestDog;
import Primavara.rest.dto.NewRequestDog;
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

    @PostMapping("new/{id}")
    private void addNewRequestDog (@RequestBody NewRequestDog newRequestDog, @PathVariable(required = true) Long id) {requestDogService.addNewRequestDog(newRequestDog, id);}

    @GetMapping("my/{id}")
    private List<Optional<RequestDog>> getAllRequestDogsByUserId(@PathVariable(required = true) Long id){
        return requestDogService.getAllRequestDogsByUserId(id);
    }
}
