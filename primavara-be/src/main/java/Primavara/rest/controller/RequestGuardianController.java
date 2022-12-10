package Primavara.rest.controller;

import Primavara.rest.domain.RequestGuardian;
import Primavara.rest.dto.NewRequestDog;
import Primavara.rest.dto.NewRequestGuardian;
import Primavara.rest.service.RequestGuardianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("reqgua")
public class RequestGuardianController {
        @Autowired
        private RequestGuardianService requestGuardianService;

        @GetMapping("")
        private List<Optional<RequestGuardian>> getAllReviewedAndPublishedRequestGuardians() {
                return requestGuardianService.getAllReviewedAndPublishedRequestGuardians();
        }

        @PostMapping("/new")
        private void addNewRequestGuardian (@RequestBody NewRequestGuardian newRequestGuardian) {requestGuardianService.addNewRequestGuardian(newRequestGuardian);}

}