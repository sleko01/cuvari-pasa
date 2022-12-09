package Primavara.rest.controller;

import Primavara.rest.domain.RequestGuardian;
import Primavara.rest.service.RequestGuardianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("reqgua")
public class RequestGuardianController {
        @Autowired
        private RequestGuardianService requestGuardianService;

        @GetMapping("")
        private Optional<RequestGuardian> getAllReviewedAndPublishedRequestGuardians() {
                return requestGuardianService.getAllReviewedAndPublishedRequestGuardians();
        }

}