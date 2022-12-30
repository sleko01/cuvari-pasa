package Primavara.rest.controller;

import Primavara.rest.domain.RequestDog;
import Primavara.rest.domain.RequestGuardian;
import Primavara.rest.service.AgreedRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("agreedRequest")
public class AgreedRequestController {

    @Autowired
    private AgreedRequestService agreedRequestService;

    @PostMapping("respond/{idUser}/{idRequest}")
    public void respondToAgreedRequest(@PathVariable(required = true) Long idUser, @PathVariable(required = true) Long idRequest) {
        agreedRequestService.responseToRequest(idUser, idRequest);
    }

    @PostMapping("initiate/{idReqGua}/{idReqDog}/{idInitiator}")
    public void initiateToAgreedRequestByBestOption(@PathVariable Long idReqGua, @PathVariable Long idReqDog, @PathVariable Long idInitiator) {
        agreedRequestService.initiateToAgreedRequestByBestOption(idReqGua, idReqDog, idInitiator);
    }

    @GetMapping("bestGuardianForDogs/{idReqDog}")
    public RequestGuardian getBestRequestGuardian(@PathVariable Long idReqDog) {
        return agreedRequestService.getBestRequestGuardian(idReqDog);
    }

    @GetMapping("bestDogsForGuardian/{idReqGua}")
    public RequestDog getBestRequestDog(@PathVariable Long idReqGua) {
        return agreedRequestService.getBestRequestDog(idReqGua);
    }
}
