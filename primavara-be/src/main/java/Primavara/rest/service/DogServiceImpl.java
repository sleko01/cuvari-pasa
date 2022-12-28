package Primavara.rest.service;

import Primavara.rest.domain.AppUser;
import Primavara.rest.domain.Breed;
import Primavara.rest.domain.Dog;
import Primavara.rest.dto.RegisterDog;
import Primavara.rest.repository.AppUserRepository;
import Primavara.rest.repository.BreedRepository;
import Primavara.rest.repository.DogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class DogServiceImpl implements DogService{

    @Autowired
    private DogRepository dogRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private BreedRepository breedRepository;

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

    private void validate(RegisterDog registerDog) {
        Assert.notNull(registerDog, "RegisterDog object must be given");
        Assert.hasText(registerDog.getName(), "RegisterDog name must be given");
        Assert.notNull(registerDog.getDateOfBirth(), "RegisterDog dateOfBirth must be given");
    }
}
