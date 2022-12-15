package Primavara.rest.repository;

import Primavara.rest.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleId(Long role_id);
    Integer countByRoleId(Long role_id);
}
