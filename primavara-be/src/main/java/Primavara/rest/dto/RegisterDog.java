package Primavara.rest.dto;

import org.hibernate.annotations.Type;

import javax.persistence.Lob;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.Date;

public class RegisterDog {

    private String name;

    private Date dateOfBirth;

    @Type(type="org.hibernate.type.BinaryType")
    private byte[] photo;

    private Long breedId;

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

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public Long getBreedId() {
        return breedId;
    }

    public void setBreedId(Long breedId) {
        this.breedId = breedId;
    }
}
