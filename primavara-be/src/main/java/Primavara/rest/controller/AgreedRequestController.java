package Primavara.rest.controller;

import Primavara.rest.repository.AgreedRequestRepository;
import Primavara.rest.service.AgreedRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("agreedRequest")
public class AgreedRequestController {

    @Autowired
    private AgreedRequestService agreedRequestService;

    @PostMapping("respond/{idUser}/{idRequest}")
    private void respondToAgreedRequest(@PathVariable(required = true) Long idUser, @PathVariable(required = true) Long idRequest) {
        agreedRequestService.responseToRequest(idUser, idRequest);
    }
}
