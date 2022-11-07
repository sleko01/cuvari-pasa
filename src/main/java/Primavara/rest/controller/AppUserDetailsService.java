package Primavara.rest.controller;

import Primavara.rest.domain.AppUser;
import Primavara.rest.repository.AppUserRepository;
import Primavara.rest.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;


@Service
public class AppUserDetailsService implements UserDetailsService {
//pribavlja detalje korisnika na temelju username-a (pri login-u)

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        AppUser user=appUserRepository.findByUsername(username);
        if(user!=null){
            return new User(
                    user.getUsername(),
                    user.getPassword(),
                    commaSeparatedStringToAuthorityList(user.getRole().getName())
                    );
        }else{
            throw new UsernameNotFoundException("No user with username " + username);
        }
    }
}
