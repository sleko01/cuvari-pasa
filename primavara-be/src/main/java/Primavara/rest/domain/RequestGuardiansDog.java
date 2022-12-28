package Primavara.rest.domain;


import javax.persistence.*;

@Entity
public class RequestGuardiansDog {

    @Id
    @GeneratedValue
    private Long requestGuardiansDogId;

    @ManyToOne
    @JoinColumn(name="request_guardian_id")
    private RequestGuardian requestGuardian;

    @OneToOne
    @JoinColumn(name="dog_id")
    private Dog dog;

    public Long getRequestGuardiansDogId() {
        return requestGuardiansDogId;
    }

    public void setRequestGuardiansDogId(Long requestGuardiansDogId) {
        this.requestGuardiansDogId = requestGuardiansDogId;
    }

    public RequestGuardian getRequestGuardian() {
        return requestGuardian;
    }

    public void setRequestGuardian(RequestGuardian requestGuardian) {
        this.requestGuardian = requestGuardian;
    }

    public Dog getDog() {
        return dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }
}
