package Primavara.rest.service;

import Primavara.rest.domain.RequestGuardian;
import Primavara.rest.repository.RequestGuardianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestGuardianServiceImpl implements RequestGuardianService {
    @Autowired
    private RequestGuardianRepository requestGuardianRepository;

    @Override
    public List<RequestGuardian> getAllRequestGuardians() {
        return requestGuardianRepository.findAll();
    }
}
