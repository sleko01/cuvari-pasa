package Primavara.rest.service;

import Primavara.rest.domain.*;
import Primavara.rest.dto.NewRequestGuardian;
import Primavara.rest.repository.AppUserRepository;
import Primavara.rest.repository.DogRepository;
import Primavara.rest.repository.RequestGuardianRepository;
import Primavara.rest.repository.RequestGuardiansDogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestGuardianServiceImpl implements RequestGuardianService {
    @Autowired
    private RequestGuardianRepository requestGuardianRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private DogRepository dogRepository;

    @Autowired
    private RequestGuardiansDogRepository requestGuardiansDogRepository;
    @Override
    public List<Optional<RequestGuardian>> getAllReviewedAndPublishedRequestGuardians() {
        return requestGuardianRepository.findAllReviewedAndPublished();
    }

    @Override
    public void addNewRequestGuardian(NewRequestGuardian newRequestGuardian){

        RequestGuardian requestGuardian=new RequestGuardian();
        requestGuardian.setLocation(newRequestGuardian.getLocation());
        requestGuardian.setNumberOfDogs(newRequestGuardian.getNumberOfDogs());
        requestGuardian.setGuardTimeBegin(newRequestGuardian.getGuardTimeBegin());
        requestGuardian.setGuardTimeEnd(newRequestGuardian.getGuardTimeEnd());
        requestGuardian.setHasExperience(newRequestGuardian.getHasExperience());
        requestGuardian.setHasDog(newRequestGuardian.getHasDog());
        //za sada
        requestGuardian.setPublished(true);
        requestGuardian.setReviewed(true);
        //
        //za sada
            AppUser appUser=appUserRepository.findByUsername("mariopetek");
        //
        requestGuardian.setAppUser(appUser);

        requestGuardianRepository.save(requestGuardian);


        for(Long dogId: newRequestGuardian.getDogId()){
            RequestGuardiansDog requestGuardiansDog = new RequestGuardiansDog();
            requestGuardiansDog.setRequestGuardian(requestGuardian);
            Dog dog=dogRepository.findByDogId(dogId);
            requestGuardiansDog.setDog(dog);
            requestGuardiansDogRepository.save(requestGuardiansDog);
        }
    }

    //validacija
}
