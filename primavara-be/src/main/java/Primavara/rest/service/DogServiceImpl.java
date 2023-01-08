package Primavara.rest.service;

import Primavara.rest.domain.*;
import Primavara.rest.dto.RegisterDog;
import Primavara.rest.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.*;

@Service
public class DogServiceImpl implements DogService{

    @Autowired
    private DogRepository dogRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private BreedRepository breedRepository;

    @Autowired
    private AgreedRequestRepository agreedRequestRepository;

    @Autowired
    private RequestGuardiansDogRepository requestGuardiansDogRepository;

    @Override
    public void addDog(RegisterDog registerDog, Long id) {
        validate(registerDog);

        if (appUserRepository.findByUserId(id) == null)
            throw new RequestDeniedException(
                    "AppUser with id " + id + " does not exists"
            );
        if (breedRepository.countByBreedId(registerDog.getBreedId()) == 0)
            throw new RequestDeniedException(
                    "Breed with id " + registerDog.getBreedId() + " does not exists"
            );
        if (dogRepository.countAllAppUsersDogsWithName(id, registerDog.getName()) > 0)
            throw new RequestDeniedException(
                    "Appuser with id " + id + " already has dog named " + registerDog.getName()
            );
        Dog dog = new Dog();
        dog.setName(registerDog.getName());
        if (java.time.LocalDate.now().isBefore(registerDog.getDateOfBirth().toLocalDate()))
            throw new RequestDeniedException(
                    "Date of birth must be in the past"
            );
        dog.setDateOfBirth(registerDog.getDateOfBirth());
        dog.setPhoto(registerDog.getPhoto());
        dog.setRatingCount(Long.valueOf(0));
        dog.setRatingSum(Long.valueOf(0));
        AppUser appUser = appUserRepository.findByUserId(id);
        if (appUser.getRole().getRoleId() == 2)
            throw new RequestDeniedException(
                    "Guardian can not add his dogs"
            );
        Breed breed = breedRepository.findByBreedId(registerDog.getBreedId());
        dog.setAppUser(appUser);
        dog.setBreed(breed);
        dogRepository.save(dog);

        appUser.setHasDog(true);
        appUserRepository.save(appUser);
    }

    @Override
    public List<Optional<Dog>> getAllMyDogs(Long id) {
        return dogRepository.findAllAppUsersDogs(id);
    }

    @Override
    public List<Breed> getAllBreeds() {
        return breedRepository.findAll();
    }

    @Override
    public List<Optional<Breed>> getAllSortedBreeds() {
        return breedRepository.findAllSorted();
    }

    @Override
    public void rateDogs(Long idInitiator, Long idUser, Long idReq, String type, HashMap<Long, Long> dogs) {
        Long idRequest;
        System.out.println(idInitiator);
        System.out.println(idUser);
        System.out.println(idReq);
        System.out.println(type);
        System.out.println(dogs.toString());
        if (Objects.equals(type, "d")) {
            idRequest = agreedRequestRepository.respondToDog(idInitiator, idUser, idReq);
        }
        else {
            idRequest = agreedRequestRepository.respondToGuardian(idInitiator, idUser, idReq);
        }
        if (agreedRequestRepository.countByAgreedRequestId(idRequest) == 0)
            throw new RequestDeniedException(
                    "Request with id " + idRequest + " does not exist"
            );
        AgreedRequest agreedRequest = agreedRequestRepository.findByAgreedRequestId(idRequest);
        if (agreedRequest.getAgreed() != null && !agreedRequest.getAgreed())
            throw  new RequestDeniedException(
                    "Can not rate not agreed request"
            );

        if (agreedRequest.getRequestGuardian() != null) {
            List<Long> dogsIdsInRequest = requestGuardiansDogRepository.findALlIdsByRequestGuardianId(agreedRequest.getRequestGuardian().getRequestGuardianId());

            for (Map.Entry<Long, Long> entry: dogs.entrySet()) {
                if (!dogsIdsInRequest.contains(entry.getKey()))
                    throw  new RequestDeniedException(
                            "Dog with id " + entry.getKey() + " was not in that walk"
                    );
                else if (entry.getValue() != -1) {
                    Dog dog = dogRepository.findByDogId(entry.getKey());
                    dog.setRatingSum(dog.getRatingSum() + entry.getValue());
                    dog.setRatingCount(dog.getRatingCount() + 1);
                    dogRepository.save(dog);
                    agreedRequest.setInitiatorRated(true);
                    agreedRequestRepository.save(agreedRequest);
                }
            }
        }
        else if (agreedRequest.getRequestDog() != null) {
            List<Long> allAppUsersDogIds = dogRepository.findAllAppUsersDogsId(agreedRequest.getInitiatorUser().getUserId());

            for (Map.Entry<Long, Long> entry: dogs.entrySet()) {
                if (!allAppUsersDogIds.contains(entry.getKey()))
                    throw  new RequestDeniedException(
                             "Dog with id " + entry.getKey() + " is not that app user's dog"
                    );
                else if (entry.getValue() != -1) {
                    Dog dog = dogRepository.findByDogId(entry.getKey());
                    dog.setRatingSum(dog.getRatingSum() + entry.getValue());
                    dog.setRatingCount(dog.getRatingCount() + 1);
                    dogRepository.save(dog);
                    agreedRequest.setInitiatorRated(true);
                    agreedRequestRepository.save(agreedRequest);
                }
            }
        }
    }

    @Override
    public Dog getDogById(Long dogId) {
        return dogRepository.findByDogId(dogId);
    }

    public String getPhoto(Long id) {
        String ime = dogRepository.getPhotoById(id);
        System.out.println(ime);
        return ime;
    }

    private void validate(RegisterDog registerDog) {
        System.out.println(registerDog.toString());
        Assert.notNull(registerDog, "RegisterDog object must be given");
        Assert.hasText(registerDog.getName(), "RegisterDog name must be given");
        Assert.notNull(registerDog.getDateOfBirth(), "RegisterDog dateOfBirth must be given");
    }
}
