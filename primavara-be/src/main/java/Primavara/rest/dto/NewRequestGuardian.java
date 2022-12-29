package Primavara.rest.dto;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

public class NewRequestGuardian {
    //pise ga vlasnik pasa

    private String location;

    private Long numberOfDogs;

    private Timestamp guardTimeBegin;

    private Timestamp guardTimeEnd;

    private Boolean hasExperience;

    private Boolean hasDog;

    private List<Long> dogId;

    private List<Long> activityId;

    private Long quantity;

    private String locationName;

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

    public List<Long> getDogId() {
        return dogId;
    }

    public List<Long> getActivityId() { return activityId; }

    public Long getQuantity() { return quantity; }

    public void setQuantity(Long quantity) { this.quantity = quantity; }

    public void setDogId(List<Long> dogId) {
        this.dogId = dogId;
    }

    public void setActivityId(List<Long> activityId) {
        this.activityId = activityId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }
}
