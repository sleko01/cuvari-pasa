package Primavara.rest.controller;

import Primavara.rest.domain.AppUser;
import Primavara.rest.dto.RegisterUser;
import Primavara.rest.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("users")
public class AppUserController {
    @Autowired
    private AppUserService appUserService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("moderation/{id}/u")
    public List<Optional<AppUser>> getAllUsersExceptCurrentUser(@PathVariable(required = true) Long id){
        return appUserService.getAllUsersExceptCurrentUser(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("moderation/{id}/r")
    public Map<Integer, List<Object>> getAllNotReviewedRequests(@PathVariable(required = true) Long id){
        return appUserService.getAllNotReviewedRequests(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("moderation/give-admin/{id}")
    public void giveAdminToAppUser(@PathVariable(required = true) Long id) {
        appUserService.giveAdminToAppUser(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("moderation/block/{id}")
    public void blockAppUser(@PathVariable(required = true) Long id) {
        appUserService.blockAppUser(id);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VLASNIK', 'ROLE_ČUVAR','ROLE_VLASNIKČUVAR')")
    @PostMapping("rate/{idInitiator}/{idUser}/{idRequest}/{value}/{type}")
    public void rateAppUser(@PathVariable Long idInitiator, @PathVariable Long idUser, @PathVariable Long idRequest, @PathVariable Long value, @PathVariable String type) {
        appUserService.rateAppUser(idInitiator, idUser, idRequest, value, type);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("moderation/reqgua/{id}/{val}")
    public void approveRequestGuardian(@PathVariable(required = true) Long id, @PathVariable(required = true) Long val){
        appUserService.approveRequestGuardian(id, val);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("moderation/reqdog/{id}/{val}")
    public void approveRequestDog(@PathVariable(required = true) Long id, @PathVariable(required = true) Long val){
        appUserService.approveRequestDog(id, val);
    }
}
