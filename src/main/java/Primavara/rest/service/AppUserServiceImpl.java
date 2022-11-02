package Primavara.rest.service;

import Primavara.rest.domain.AppUser;
import Primavara.rest.domain.Role;
import Primavara.rest.dto.RegisterUser;
import Primavara.rest.repository.AppUserRepository;
import Primavara.rest.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserServiceImpl implements AppUserService{
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    @Override
    public void addAppUser(RegisterUser registerUser) {
        AppUser appUser = new AppUser();
        appUser.setFirstName(registerUser.getFirstName());
        appUser.setLastName(registerUser.getLastName());
        appUser.setUsername(registerUser.getUsername());
        appUser.setPassword(registerUser.getPassword());
        appUser.setContact(registerUser.getContact());
        Role role = roleRepository.findByRoleId(registerUser.getRoleId());
        appUser.setRole(role);
        appUserRepository.save(appUser);
    }
}
