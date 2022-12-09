package Primavara.rest.controller;

import Primavara.rest.domain.RequestDog;
import Primavara.rest.service.RequestDogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("reqdog")
public class RequestDogController {
    @Autowired
    private RequestDogService requestDogService;

    @GetMapping("")
    private Optional<RequestDog> getAllReviewedAndPublishedRequestDogs() {
        return requestDogService.getAllReviewedAndPublishedRequestDogs();
    }

}
