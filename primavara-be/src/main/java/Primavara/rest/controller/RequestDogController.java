package Primavara.rest.controller;

import Primavara.rest.domain.RequestDog;
import Primavara.rest.dto.NewRequestDog;
import Primavara.rest.service.AgreedRequestService;
import Primavara.rest.service.RequestDogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("reqdog")
public class RequestDogController {
    @Autowired
    private RequestDogService requestDogService;

    @Autowired
    private AgreedRequestService agreedRequestService;

    @GetMapping("")
    public List<Optional<RequestDog>> getAllReviewedAndPublishedRequestDogs() {
        return requestDogService.getAllReviewedAndPublishedRequestDogs();
    }

    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_ČUVAR', 'ROLE_VLASNIKČUVAR')")
    @PostMapping("new/{id}")
    public void addNewRequestDog (@RequestBody NewRequestDog newRequestDog, @PathVariable(required = true) Long id) {requestDogService.addNewRequestDog(newRequestDog, id);}

    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_ČUVAR', 'ROLE_VLASNIKČUVAR')")
    @GetMapping("my/{id}")
    public List<Optional<RequestDog>> getAllRequestDogsByUserId(@PathVariable(required = true) Long id){
        return requestDogService.getAllRequestDogsByUserId(id);
    }

    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VLASNIK', 'ROLE_ČUVAR', 'ROLE_VLASNIKČUVAR')")
    @PostMapping("initiate/{idReqDog}/{idInitiator}")
    public void initiateToRequestDog(@PathVariable(required = true) Long idReqDog, @PathVariable(required = true) Long idInitiator) {
        agreedRequestService.initiateToRequestDog(idReqDog, idInitiator);
    }

}
