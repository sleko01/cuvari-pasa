package Primavara.rest.domain;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class RequestGuardian {
    //pise ga vlasnik pasa
    @Id
    @GeneratedValue
    private Long requestGuardianId;

    private String location;

    private Long numberOfDogs;

    private Timestamp guardTimeBegin;

    private Timestamp guardTimeEnd;

    private Boolean hasExperience;

    private Boolean hasDog;

    @NotNull
    private Boolean isPublished;

    @NotNull
    private Boolean isReviewed;

    @ManyToOne
    @JoinColumn(name="user_id")
    private AppUser appUser;

    private String locationName;

    public Long getRequestGuardianId() {
        return requestGuardianId;
    }

    public void setRequestGuardianId(Long requestGuardianId) {
        this.requestGuardianId = requestGuardianId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getNumberOfDogs() {
        return numberOfDogs;
    }

    public void setNumberOfDogs(Long numberOfDogs) {
        this.numberOfDogs = numberOfDogs;
    }

    public Timestamp getGuardTimeBegin() {
        return guardTimeBegin;
    }

    public void setGuardTimeBegin(Timestamp guardTimeBegin) {
        this.guardTimeBegin = guardTimeBegin;
    }

    public Timestamp getGuardTimeEnd() {
        return guardTimeEnd;
    }

    public void setGuardTimeEnd(Timestamp guardTimeEnd) {
        this.guardTimeEnd = guardTimeEnd;
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

    public Boolean getPublished() {
        return isPublished;
    }

    public void setPublished(Boolean published) {
        isPublished = published;
    }

    public Boolean getReviewed() {
        return isReviewed;
    }

    public void setReviewed(Boolean reviewed) {
        isReviewed = reviewed;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }
}
