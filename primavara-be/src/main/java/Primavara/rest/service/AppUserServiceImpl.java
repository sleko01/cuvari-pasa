package Primavara.rest.service;

import Primavara.rest.CuvariPasaApplication;
import Primavara.rest.domain.AppUser;
import Primavara.rest.domain.Role;
import Primavara.rest.dto.RegisterUser;
import Primavara.rest.repository.AppUserRepository;
import Primavara.rest.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class AppUserServiceImpl implements AppUserService{

    private static final String EMAIL_FORMAT = "[a-z0-9]+@[a-z]+\\.[a-z]{2,3}";
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private RoleRepository roleRepository;

    PasswordEncoder passwordEncoder= new BCryptPasswordEncoder();

    @Override
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    @Override
    public String addAppUser(RegisterUser registerUser) {

        validate(registerUser);
        return "doso";
        /*if (appUserRepository.countByUsername(registerUser.getUsername()) > 0)
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
        appUserRepository.save(appUser);*/
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
}
