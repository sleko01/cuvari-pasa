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
public class dogExceptionTest {
    Date date1= Date.valueOf("2024-01-01");
    String name = "aetrtte";
    RegisterDog registerDog = new RegisterDog(name, date1, "", 3L);

    @Autowired
    private DogService dogService;

    @Test
    public void dogExceptionTest(){
        RequestDeniedException exception = assertThrows(RequestDeniedException.class, () -> dogService.addDog(registerDog, 1L));
        assertEquals("Date of birth must be in the past", exception.getMessage());
    }
}
