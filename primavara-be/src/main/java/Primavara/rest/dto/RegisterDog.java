package Primavara.rest.dto;

import org.hibernate.annotations.Type;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Lob;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.Date;

public class RegisterDog {

    private String name;

    private Date dateOfBirth;

    private String photo;

    private Long breedId;

    public RegisterDog(String name, Date dateOfBirth, String photo, Long breedId) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.photo = photo;
        this.breedId = breedId;
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

    public Long getBreedId() {
        return breedId;
    }

    public void setBreedId(Long breedId) {
        this.breedId = breedId;
    }

    @Override
    public String toString() {
        return "RegisterDog{" +
                "name='" + name + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", photo=" + photo +
                ", breedId=" + breedId +
                '}';
    }
}
