package Primavara.rest.service;

import Primavara.rest.domain.AppUser;
import Primavara.rest.domain.Breed;
import Primavara.rest.domain.RequestDog;
import Primavara.rest.domain.Role;
import Primavara.rest.dto.NewRequestDog;
import Primavara.rest.repository.AppUserRepository;
import Primavara.rest.repository.BreedRepository;
import Primavara.rest.repository.RequestDogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestDogServiceImpl implements RequestDogService{
    @Autowired
    private RequestDogRepository requestDogRepository;

    @Autowired
    private BreedRepository breedRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public List<Optional<RequestDog>> getAllReviewedAndPublishedRequestDogs() {
        return requestDogRepository.findAllReviewedAndPublished();
    }

    @Override
    public void addNewRequestDog(NewRequestDog newRequestDog){

        RequestDog requestDog= new RequestDog();
        requestDog.setDogAge(newRequestDog.getDogAge());
        requestDog.setDogTimeBegin(newRequestDog.getDogTimeBegin());
        requestDog.setDogTimeEnd(newRequestDog.getDogTimeEnd());
        requestDog.setFlexible(newRequestDog.getFlexible());
        requestDog.setLocation(newRequestDog.getLocation());
        requestDog.setNumberOfDogs(newRequestDog.getNumberOfDogs());
        //za sada
            requestDog.setPublished(true);
            requestDog.setReviewed(true);
        //
        Breed dogBreed=breedRepository.findByBreedId(newRequestDog.getBreedId());
        requestDog.setBreed(dogBreed);

        //za sada (služi da bi se moglo iscitati hasExperience i hasDog atributi)
            AppUser appUser=appUserRepository.findByUsername("mariopetek");
        //
        requestDog.setAppUser(appUser);

        requestDogRepository.save(requestDog);


    }
}
