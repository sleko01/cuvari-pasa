package Primavara.rest.controller;

import Primavara.rest.domain.Dog;
import Primavara.rest.domain.RequestGuardian;
import Primavara.rest.dto.NewRequestGuardian;
import Primavara.rest.service.AgreedRequestService;
import Primavara.rest.service.RequestGuardianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("reqgua")
public class RequestGuardianController {
        @Autowired
        private RequestGuardianService requestGuardianService;

        @Autowired
        private AgreedRequestService agreedRequestService;

        @GetMapping(value ={"", "{idUser}"})
        public List<Optional<RequestGuardian>> getAllReviewedAndPublishedRequestGuardians(@PathVariable(required = false) Long idUser) {
                if (idUser == null)
                        return requestGuardianService.getAllReviewedAndPublishedRequestGuardians();
                else
                        return requestGuardianService.getAllReviewedAndPublishedRequestGuardiansAndNotInitiatedByMe(idUser);
        }

        //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VLASNIK', 'ROLE_VLASNIKČUVAR')")
        @PostMapping("new/{id}")
        public void addNewRequestGuardian (@RequestBody NewRequestGuardian newRequestGuardian, @PathVariable(required = true) Long id) {requestGuardianService.addNewRequestGuardian(newRequestGuardian, id);}

        //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VLASNIK', 'ROLE_VLASNIKČUVAR')")
        @GetMapping("my/{id}")
        public List<Optional<RequestGuardian>> getAllRequestGuardiansByUserId(@PathVariable(required = true) Long id){
                return requestGuardianService.getAllReviewedAndPublishedRequestGuardiansAndMine(id);
        }

        //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VLASNIK', 'ROLE_ČUVAR', 'ROLE_VLASNIKČUVAR')")
        @PostMapping("initiate/{idReqGua}/{idInitiator}")
        public void initiateToRequestGuardian(@PathVariable(required = true) Long idReqGua, @PathVariable(required = true) Long idInitiator) {
                agreedRequestService.initiateToRequestGuardian(idReqGua, idInitiator);
        }

        //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VLASNIK', 'ROLE_ČUVAR', 'ROLE_VLASNIKČUVAR')")
        @GetMapping("getDogsInRequest/{idReqGua}")
        public List<Long> getDogsInRequest(@PathVariable Long idReqGua){
                return agreedRequestService.getDogsInRequest(idReqGua);
        }
}