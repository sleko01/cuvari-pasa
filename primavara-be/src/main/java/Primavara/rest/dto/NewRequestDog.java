package Primavara.rest.dto;


import java.sql.Timestamp;

public class NewRequestDog {
    //pise ga cuvar pasa

    private Long dogAge;

    private Timestamp dogTimeBegin;

    private Timestamp dogTimeEnd;

    private Boolean isFlexible;

    private String location;

    private Long numberOfDogs;

    private Long breedId;

    private String locationName;

    public Long getDogAge() {
        return dogAge;
    }

    public void setDogAge(Long dogAge) {
        this.dogAge = dogAge;
    }

    public Timestamp getDogTimeBegin() {
        return dogTimeBegin;
    }

    public void setDogTimeBegin(Timestamp dogTimeBegin) {
        this.dogTimeBegin = dogTimeBegin;
    }

    public Timestamp getDogTimeEnd() {
        return dogTimeEnd;
    }

    public void setDogTimeEnd(Timestamp dogTimeEnd) {
        this.dogTimeEnd = dogTimeEnd;
    }

    public Boolean getFlexible() {
        return isFlexible;
    }

    public void setFlexible(Boolean isFlexible) {
        this.isFlexible = isFlexible;
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

    public Long getBreedId() { return breedId; }

    public void setBreedId(Long breedId) { this.breedId = breedId; }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }
}
