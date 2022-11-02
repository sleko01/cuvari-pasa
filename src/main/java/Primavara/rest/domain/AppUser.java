package Primavara.rest.domain;

import javax.persistence.*;

@Entity
@Table(name = "APPUSER")
public class AppUser {
    @Id
    @GeneratedValue
    private Long userId;

    @ManyToOne
    @JoinColumn(name="role_id")
    private Role role;

    private String username;
    private String firstName;
    private String lastName;
    private String password;
    private Long ratingSum;
    private Long ratingCount;
    private String contact;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role roleId) {
        this.role = roleId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }
}
