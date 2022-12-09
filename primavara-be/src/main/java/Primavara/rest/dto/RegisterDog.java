package Primavara.rest.dto;

import javax.persistence.Lob;
import java.sql.Clob;
import java.sql.Date;

public class RegisterDog {

    private String name;

    private Date dateOfBirth;

    @Lob
    private Clob photo;

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

    public Clob getPhoto() {
        return photo;
    }

    public void setPhoto(Clob photo) {
        this.photo = photo;
    }
}
