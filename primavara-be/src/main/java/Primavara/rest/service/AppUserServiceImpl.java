package Primavara.rest.service;

import Primavara.rest.domain.*;
import Primavara.rest.dto.RegisterUser;
import Primavara.rest.repository.*;
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

    @Autowired
    private AgreedRequestRepository agreedRequestRepository;

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
        appUser.setBlocked(false);
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

    @Override
    public Long getIdByUsername(String username) {
        return appUserRepository.findByUsername(username).getUserId();
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

    @Override
    public void giveAdminToAppUser(Long id) {
        if (appUserRepository.countByUserId(id) == 0)
            throw new RequestDeniedException(
                    "User with id " + id + " does not exist"
            );
        AppUser user = appUserRepository.findByUserId(id);
        user.setRole(roleRepository.findByRoleId(4L));
        appUserRepository.save(user);
    }

    @Override
    public void blockAppUser(Long id) {
        if (appUserRepository.countByUserId(id) == 0)
            throw new RequestDeniedException(
                    "User with id " + id + " does not exist"
            );
        AppUser user = appUserRepository.findByUserId(id);
        user.setBlocked(true);
        appUserRepository.save(user);
    }

    @Override
    public void rateAppUser(Long idRequest, Long value) {
        if (value != -1) {
            if (agreedRequestRepository.countByAgreedRequestId(idRequest) == 0)
                throw new RequestDeniedException(
                        "Request with id " + idRequest + " does not exist"
                );
            AgreedRequest agreedRequest = agreedRequestRepository.findByAgreedRequestId(idRequest);
            if (!agreedRequest.getAgreed())
                throw  new RequestDeniedException(
                        "Can not rate not agreed request"
                );

            if (agreedRequest.getRequestDog() == null) {
                AppUser initiator = agreedRequest.getInitiatorUser();
                initiator.setRatingSum(initiator.getRatingSum() + value);
                initiator.setRatingCount(initiator.getRatingCount() + 1);
                appUserRepository.save(initiator);
                agreedRequest.setUserRated(true);
                agreedRequestRepository.save(agreedRequest);
            } else if (agreedRequest.getRequestGuardian() == null) {
                AppUser appUser = agreedRequest.getAppUser();
                appUser.setRatingSum(appUser.getRatingSum() + value);
                appUser.setRatingCount(appUser.getRatingCount() + 1);
                appUserRepository.save(appUser);
                agreedRequest.setInitiatorRated(true);
                agreedRequestRepository.save(agreedRequest);
            } else {
                RequestDog requestDog = agreedRequest.getRequestDog();
                RequestGuardian requestGuardian = agreedRequest.getRequestGuardian();
                if (agreedRequest.getAppUser().getUserId() == requestDog.getAppUser().getUserId()) {
                    //ako je appuser jednak cuvaru
                    AppUser appUser = agreedRequest.getAppUser();
                    appUser.setRatingSum(appUser.getRatingSum() + value);
                    appUser.setRatingCount(appUser.getRatingCount() + 1);
                    appUserRepository.save(appUser);
                    agreedRequest.setUserRated(true);
                    agreedRequestRepository.save(agreedRequest);
                }
                else if (agreedRequest.getInitiatorUser().getUserId() == requestDog.getAppUser().getUserId()) {
                    //ako je initiator jednak cuvaru
                    AppUser initiator = agreedRequest.getInitiatorUser();
                    initiator.setRatingSum(initiator.getRatingSum() + value);
                    initiator.setRatingCount(initiator.getRatingCount() + 1);
                    appUserRepository.save(initiator);
                    agreedRequest.setInitiatorRated(true);
                    agreedRequestRepository.save(agreedRequest);
                }
            }
        }
    }

    @Override
    public void approveRequestGuardian(Long id, Long val){
        if(requestGuardianRepository.countByRequestGuardianId(id)==0){
            throw new RequestDeniedException(
                    "RequestGuardian with id " + id + " does not exist"
            );
        }
        RequestGuardian requestGuardian = requestGuardianRepository.findByRequestGuardianId(id);

        if(val==0){
            requestGuardian.setPublished(false);
        }else if(val==1){
            requestGuardian.setPublished(true);
        }else{
            throw new RequestDeniedException(
                    "Cannot approve RequestGuardian with value of " + val
            );
        }
        requestGuardian.setReviewed(true);
        requestGuardianRepository.save(requestGuardian);
    }

    @Override
    public void approveRequestDog(Long id, Long val){
        if(requestDogRepository.countByRequestDogId(id)==0){
            throw new RequestDeniedException(
                    "RequestDog with id " + id + " does not exist"
            );
        }
        RequestDog requestDog = requestDogRepository.findByRequestDogId(id);

        if(val==0){
            requestDog.setPublished(false);
        }else if(val==1){
            requestDog.setPublished(true);
        }else{
            throw new RequestDeniedException(
                    "Cannot approve RequestDog with value of " + val
            );
        }
        requestDog.setReviewed(true);
        requestDogRepository.save(requestDog);
    }

}
