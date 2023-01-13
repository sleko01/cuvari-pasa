package Primavara.rest;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import static org.junit.jupiter.api.Assertions.assertEquals;

import Primavara.rest.service.AppUserService;
import Primavara.rest.domain.AppUser;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class adminTest {
    Long id = 36L;

    @Autowired
    private AppUserService appUserService;

    @Test
    void adminTest(){
        appUserService.giveAdminToAppUser(id);
        AppUser user = appUserService.getUserById(id);
        assertEquals(4L, user.getRole().getRoleId());
    }
}
