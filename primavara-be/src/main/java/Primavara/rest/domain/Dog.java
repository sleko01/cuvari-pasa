package Primavara.rest.domain;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Dog {

    @Id
    @GeneratedValue
    private Long dogId;

    @NotNull
    private String name;

    @NotNull
    private Date dateOfBirth;

    private String photo;

    @NotNull
    private Long ratingSum;

    @NotNull
    private Long ratingCount;

    @ManyToOne
    @JoinColumn(name="breed_id")
    private Breed breed;

    @ManyToOne
    @JoinColumn(name="user_id")
    private AppUser appUser;

    public Long getDogId() {
        return dogId;
    }

    public void setDogId(Long dogId) {
        this.dogId = dogId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Long getRatingSum() {
        return ratingSum;
    }

    public void setRatingSum(Long ratingSum) {
        this.ratingSum = ratingSum;
    }

    public Long getRatingCount() {
        return ratingCount;
    }

    public void setRatingCount(Long ratingCount) {
        this.ratingCount = ratingCount;
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
}
