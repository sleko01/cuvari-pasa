package Primavara.rest.controller;

import Primavara.rest.domain.AppUser;
import Primavara.rest.dto.RegisterUser;
import Primavara.rest.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("users")
public class AppUserController {
    @Autowired
    private AppUserService appUserService;

    @GetMapping("")
    private List<AppUser> getAllUsers() {
        return appUserService.getAllUsers();
    }

    @PostMapping("register")
    private void addAppUser(@RequestBody RegisterUser registerUser) {appUserService.addAppUser(registerUser);}

    @GetMapping("profile/{id}")
    public AppUser getUserById(@PathVariable(required = true) Long id){
        return appUserService.getUserById(id);
    }

    @GetMapping("/moderation/{id}/u")
    public List<Optional<AppUser>> getAllUsersExceptCurrentUser(@PathVariable(required = true) Long id){
        return appUserService.getAllUsersExceptCurrentUser(id);
    }
}
