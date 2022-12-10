package Primavara.rest.service;

import Primavara.rest.domain.AppUser;
import Primavara.rest.domain.RequestDog;
import Primavara.rest.domain.RequestGuardian;
import Primavara.rest.domain.Role;
import Primavara.rest.dto.RegisterUser;
import Primavara.rest.repository.AppUserRepository;
import Primavara.rest.repository.RequestDogRepository;
import Primavara.rest.repository.RequestGuardianRepository;
import Primavara.rest.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.*;

@Service
public class AppUserServiceImpl implements AppUserService{

    private static final String EMAIL_FORMAT = "[a-z0-9]+@[a-z]+\\.[a-z]{2,3}";
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RequestGuardianRepository requestGuardianRepository;
    @Autowired
    private RequestDogRepository requestDogRepository;
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    @Override
    public void addAppUser(RegisterUser registerUser) {

        validate(registerUser);

        if (appUserRepository.countByUsername(registerUser.getUsername()) > 0)
            throw new RequestDeniedException(
                    "AppUser with username " + registerUser.getUsername() + " already exists"
            );
        if (appUserRepository.countByEmail(registerUser.getEmail()) > 0)
            throw new RequestDeniedException(
                    "AppUser with email " + registerUser.getEmail() + " already exists"
            );
        AppUser appUser = new AppUser();
        String encodedPassword=passwordEncoder.encode(registerUser.getPassword());
        appUser.setFirstName(registerUser.getFirstName());
        appUser.setLastName(registerUser.getLastName());
        appUser.setUsername(registerUser.getUsername());
        appUser.setPassword(encodedPassword);
        appUser.setEmail(registerUser.getEmail());
        appUser.setRatingCount(Long.valueOf(0));
        appUser.setRatingSum(Long.valueOf(0));
        Role role = roleRepository.findByRoleId(registerUser.getRoleId());
        appUser.setRole(role);
        appUserRepository.save(appUser);

        //appuser tablica ima atribute has_dog i has_experience, pa bi trebalo za čuvare staviti
        // opciju pri registraciji da mogu ispuniti te atribute (samo neki checkbox ili tak nesto)
        //za vlasnike staviti null ili nesto drugo
    }

    @Override
    public AppUser getUserById(Long id) {
        return appUserRepository.findByUserId(id);
    }

    private void validate(RegisterUser registerUser) {
        Assert.notNull(registerUser, "RegisterUser object must be given");
        Assert.hasText(registerUser.getUsername(), "RegisterUser username must be given");
        Assert.hasText(registerUser.getEmail(), "RegisterUser email must be given");
        if (roleRepository.countByRoleId(registerUser.getRoleId()) == 0)
            throw new RequestDeniedException(
                    "Role with id " + registerUser.getRoleId() + " does not exist"
            );
        Assert.isTrue(registerUser.getEmail().matches(EMAIL_FORMAT), "Email in wrong format");
    }

    //za admina
    @Override
    public List<Optional<AppUser>> getAllUsersExceptCurrentUser(Long id){
        AppUser appUser=appUserRepository.findByUserId(id);
        if(appUser.getRole().getRoleId()!=4){
            throw new RequestDeniedException(
                    "User with role " + appUser.getRole().getName() + " does not have access"
            );
        }

        return appUserRepository.findAllExceptCurrentUser(id);
    }

    @Override
    public Map<Integer, List<Object>> getAllNotReviewedRequests(Long id){
        AppUser appUser=appUserRepository.findByUserId(id);
        if(appUser.getRole().getRoleId()!=4){
            throw new RequestDeniedException(
                    "User with role " + appUser.getRole().getName() + " does not have access"
            );
        }

        Map<Integer, List<Object>> allNotReviewedRequests = new HashMap<>();

        List<RequestDog> notReviewedRequestDogs = requestDogRepository.findAllNotReviewed();
        List<RequestGuardian> notReviewedRequestGuardians = requestGuardianRepository.findAllNotReviewed();

        allNotReviewedRequests.put(1, Collections.singletonList(notReviewedRequestDogs));
        allNotReviewedRequests.put(2, Collections.singletonList(notReviewedRequestGuardians));

        return allNotReviewedRequests;

    }
}
