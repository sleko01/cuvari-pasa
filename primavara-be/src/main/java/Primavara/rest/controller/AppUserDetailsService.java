package Primavara.rest.controller;

import Primavara.rest.domain.AppUser;
import Primavara.rest.domain.Role;
import Primavara.rest.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

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
