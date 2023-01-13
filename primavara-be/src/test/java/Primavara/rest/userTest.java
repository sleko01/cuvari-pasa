package Primavara.rest;

import Primavara.rest.repository.RoleRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import static org.junit.jupiter.api.Assertions.assertEquals;

import Primavara.rest.dto.RegisterUser;
import Primavara.rest.service.AppUserService;
import Primavara.rest.domain.AppUser;



@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class userTest {

    private String user = "asdasd17";

    private RegisterUser registerUser = new RegisterUser(user, "ivan", "kapusta", "asdasdasd", user +"@asd.com", 2L);

    @Autowired
    private AppUserService appUserService;

    @Autowired
    private RoleRepository roleRepository;



    @Test
    void createUser(){
        appUserService.addAppUser(registerUser);
        Long id = appUserService.getIdByUsername(user);
        AppUser testUser = appUserService.getUserById(id);
        assertEquals(user, testUser.getUsername());

    }



}
