package Primavara.rest;

import Primavara.rest.repository.RoleRepository;
import Primavara.rest.service.RequestDeniedException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import Primavara.rest.dto.RegisterUser;
import Primavara.rest.service.AppUserService;


@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class userExceptionTest {

    private String user = "asd";

    private RegisterUser registerUser = new RegisterUser(user, "ivan", "kapusta", "asdasdasd", user +"@asd.com", 2L);

    @Autowired
    private AppUserService appUserService;

    @Autowired
    private RoleRepository roleRepository;



    @Test
    void userExcept(){
        RequestDeniedException requestDeniedException = assertThrows(RequestDeniedException.class, () -> appUserService.addAppUser(registerUser));
        assertEquals("AppUser with username " + user + " already exists", requestDeniedException.getMessage());
    }



}

