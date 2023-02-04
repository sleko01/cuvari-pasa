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

    void giveAdminToAppUser(Long id);

    void blockAppUser(Long id);

    void rateAppUser(Long idInitiator, Long idUser, Long idRequest, Long value, String type);

    void approveRequestGuardian(Long id, Long val);

    void approveRequestDog(Long id, Long val);
}
