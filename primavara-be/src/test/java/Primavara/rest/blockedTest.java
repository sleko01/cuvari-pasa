package Primavara.rest;


import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import static org.junit.jupiter.api.Assertions.assertEquals;

import Primavara.rest.service.AppUserService;
import Primavara.rest.domain.AppUser;



@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class blockedTest {
    Long id = 35L;

    @Autowired
    private AppUserService appUserService;

    @Test
    void blockedTest(){
        appUserService.blockAppUser(id);
        AppUser user = appUserService.getUserById(id);
        assertEquals(true, user.getBlocked());
    }

}
