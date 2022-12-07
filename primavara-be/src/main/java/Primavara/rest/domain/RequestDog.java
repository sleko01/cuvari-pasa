package Primavara.rest.domain;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
public class RequestDog {
    @Id
    @GeneratedValue
    private Long requestDogId;

    private Long dogAge;

    @NotNull
    private Timestamp dogTimeBegin;

    @NotNull
    private Timestamp dogTimeEnd;

    @NotNull
    private Boolean isFlexible;

    @NotNull
    private String location;

    @NotNull
    private Long numberOfDogs;

    @NotNull
    private Boolean isPublished;

    @NotNull
    private Boolean isReviewed;

    @ManyToOne
    @JoinColumn(name="breed_id")
    private Breed breed;

    @ManyToOne
    @JoinColumn(name="user_id")
    private AppUser appUser;

    public Long getRequestDogId() {
        return requestDogId;
    }

    public void setRequestDogId(Long requestDogId) {
        this.requestDogId = requestDogId;
    }

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

    public void setFlexible(Boolean flexible) {
        isFlexible = flexible;
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

    public Breed getBreed() {
        return breed;
    }

    public void setBreed(Breed breed) {
        this.breed = breed;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }
}
