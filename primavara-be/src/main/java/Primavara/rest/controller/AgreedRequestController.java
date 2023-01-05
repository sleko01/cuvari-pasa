package Primavara.rest.controller;

import Primavara.rest.domain.RequestDog;
import Primavara.rest.domain.RequestGuardian;
import Primavara.rest.dto.RatedRequestsDTO;
import Primavara.rest.service.AgreedRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("agreedRequest")
public class AgreedRequestController {

    @Autowired
    private AgreedRequestService agreedRequestService;

    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VLASNIK', 'ROLE_ČUVAR', 'ROLE_VLASNIKČUVAR')")
    @PostMapping("respond/{idInitiator}/{idUser}/{idReqGua}/{value}/g")
    public void respondToAgreedRequestGuardian(@PathVariable Long idInitiator, @PathVariable Long idUser, @PathVariable Long idReqGua, @PathVariable Long value) {
        agreedRequestService.responseToRequestGuardian(idInitiator, idUser, idReqGua, value);
    }

    @PostMapping("respond/{idInitiator}/{idUser}/{idReqDog}/{value}/d")
    public void respondToAgreedRequestDog(@PathVariable Long idInitiator, @PathVariable Long idUser, @PathVariable Long idReqDog, @PathVariable Long value) {
        agreedRequestService.responseToRequestDog(idInitiator, idUser, idReqDog, value);
    }


    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VLASNIK', 'ROLE_ČUVAR', 'ROLE_VLASNIKČUVAR')")
    @PostMapping("initiate/{idReqGua}/{idReqDog}/{idInitiator}")
    public void initiateToAgreedRequestByBestOption(@PathVariable Long idReqGua, @PathVariable Long idReqDog, @PathVariable Long idInitiator) {
        agreedRequestService.initiateToAgreedRequestByBestOption(idReqGua, idReqDog, idInitiator);
    }

    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VLASNIK', 'ROLE_VLASNIKČUVAR')")
    @GetMapping("bestGuardianForDogs/{idReqDog}")
    public RequestGuardian getBestRequestGuardian(@PathVariable Long idReqDog) {
        return agreedRequestService.getBestRequestGuardian(idReqDog);
    }

    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_ČUVAR', 'ROLE_VLASNIKČUVAR')")
    @GetMapping("bestDogsForGuardian/{idReqGua}")
    public RequestDog getBestRequestDog(@PathVariable Long idReqGua) {
        return agreedRequestService.getBestRequestDog(idReqGua);
    }

    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VLASNIK', 'ROLE_ČUVAR', 'ROLE_VLASNIKČUVAR')")
    @GetMapping("myOfferings/{id}")
    public HashMap<Long, List> getMyoffers(@PathVariable Long id) {
        return agreedRequestService.getMyOffers(id);
    }

    //vraca samo za one kojoma je proslo vrijeme zavrsetka!!!
    @GetMapping("myRatedGuardians/{id}")
    public List<RatedRequestsDTO> getMyRatedGuardians(@PathVariable Long id) {
        return agreedRequestService.getMyRatedGuardians(id);
    }

    //vraca samo za one kojoma je proslo vrijeme zavrsetka!!! ako me netko pita zato nista ne vraca polomit cu ga, ako hocete za bilo koje vrijeme morate u agreedrequest repozitorij sql upit za koji se pita maknuti zadnji uvjet currenttimetamp
    @GetMapping("myRatedDogs/{id}")
    public List<RatedRequestsDTO> getMyRatedDogs(@PathVariable Long id) {
        return agreedRequestService.getMyRatedDogs(id);
    }
}
