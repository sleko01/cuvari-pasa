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

    public void setDogId(Long[] dogId) {
        this.dogId = Arrays.asList(dogId);
    }
}
