package Primavara.rest.domain;

import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
public class Guardian {

    @Id
    @Column(name = "user_id")
    private Long guardianId;

    @OneToOne
    @MapsId
    @JoinColumn(name="user_id")
    private AppUser appUser;

    @NotNull
    private Boolean hasExperience;

    @NotNull
    private Boolean hasDog;

    public Long getGuardianId() {
        return guardianId;
    }

    public void setGuardianId(Long guardianId) {
        this.guardianId = guardianId;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public Boolean getHasExperience() {
        return hasExperience;
    }

    public void setHasExperience(Boolean hasExperience) {
        this.hasExperience = hasExperience;
    }

    public Boolean getHasDog() {
        return hasDog;
    }

    public void setHasDog(Boolean hasDog) {
        this.hasDog = hasDog;
    }
}
