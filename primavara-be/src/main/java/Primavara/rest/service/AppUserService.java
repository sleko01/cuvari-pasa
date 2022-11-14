package Primavara.rest.service;

import Primavara.rest.domain.AppUser;
import Primavara.rest.dto.RegisterUser;

import java.util.List;

public interface AppUserService {
    List<AppUser> getAllUsers();
    void addAppUser(RegisterUser appUser);
}
