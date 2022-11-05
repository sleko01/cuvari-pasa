package Primavara.rest.domain;

import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
public class Owner {

    @Id
    @Column(name = "user_id")
    private Long ownerId;

    @OneToOne
    @MapsId
    @JoinColumn(name="user_id")
    private AppUser appUser;

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }
}
