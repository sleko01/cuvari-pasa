package Primavara.rest.service;

import Primavara.rest.domain.AppUser;
import Primavara.rest.dto.RegisterUser;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface AppUserService {
    List<AppUser> getAllUsers();
    void addAppUser(RegisterUser appUser);
    AppUser getUserById(Long id);

    Long getIdByUsername(String username);
    //za admina
    List<Optional<AppUser>> getAllUsersExceptCurrentUser(Long id);
    Map<Integer, List<Object>> getAllNotReviewedRequests(Long id);
}
