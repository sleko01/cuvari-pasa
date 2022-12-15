package Primavara.rest.controller;

import Primavara.rest.domain.AppUser;
import Primavara.rest.dto.RegisterUser;
import Primavara.rest.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("users")
public class AppUserController {
    @Autowired
    private AppUserService appUserService;

    @GetMapping("")
    public List<AppUser> getAllUsers() {
        return appUserService.getAllUsers();
    }

    @GetMapping("username/{username}")
    public Long getAppUserIdByUsername(@PathVariable(required = true) String username) { return appUserService.getIdByUsername(username); }

    @PostMapping("register")
    public void addAppUser(@RequestBody RegisterUser registerUser) {appUserService.addAppUser(registerUser);}

    @GetMapping("profile/{id}")
    public AppUser getUserById(@PathVariable(required = true) Long id){
        return appUserService.getUserById(id);
    }

    @GetMapping("moderation/{id}/u")
    public List<Optional<AppUser>> getAllUsersExceptCurrentUser(@PathVariable(required = true) Long id){
        return appUserService.getAllUsersExceptCurrentUser(id);
    }

    @GetMapping("moderation/{id}/r")
    public Map<Integer, List<Object>> getAllNotReviewedRequests(@PathVariable(required = true) Long id){
        return appUserService.getAllNotReviewedRequests(id);
    }
}
