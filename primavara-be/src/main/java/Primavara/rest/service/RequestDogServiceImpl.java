package Primavara.rest.service;

import Primavara.rest.domain.RequestDog;
import Primavara.rest.repository.RequestDogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestDogServiceImpl implements RequestDogService{
    @Autowired
    private RequestDogRepository requestDogRepository;
    @Override
    public List<Optional<RequestDog>> getAllReviewedAndPublishedRequestDogs() {
        return requestDogRepository.findAllReviewedAndPublished();
    }
}
