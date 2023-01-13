package Primavara.rest;

import Primavara.rest.domain.Dog;
import Primavara.rest.dto.RegisterDog;
import Primavara.rest.repository.RoleRepository;
import Primavara.rest.service.DogService;
import Primavara.rest.service.RequestDeniedException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import Primavara.rest.dto.RegisterUser;
import Primavara.rest.service.AppUserService;
import Primavara.rest.domain.AppUser;

import java.sql.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class registerDogTest {
    Date date1= Date.valueOf("2020-01-01");
    String name = "flokitest";
    RegisterDog registerDog = new RegisterDog(name, date1, "", 3L);

    @Autowired
    private DogService dogService;

    @Test
    public void registerDogTest(){
        dogService.addDog(registerDog, 1L);
        List<Optional<Dog>> dogs = dogService.getAllMyDogs(1L);
        String trazeni = "";
        for (Optional<Dog> dog : dogs){
            if (Objects.equals(dog.get().getName(), name)){
                trazeni = dog.get().getName();
                break;
            }
        }
        assertEquals(name, trazeni);
    }
}
