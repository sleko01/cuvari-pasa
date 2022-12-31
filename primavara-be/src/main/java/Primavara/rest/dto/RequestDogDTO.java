package Primavara.rest.dto;

import Primavara.rest.domain.AppUser;
import Primavara.rest.domain.RequestDog;

public class RequestDogDTO {

    private AppUser initiator_user;

    private RequestDog requestDog;

    public RequestDogDTO(AppUser initiator_user, RequestDog requestDog) {
        this.initiator_user = initiator_user;
        this.requestDog = requestDog;
    }

    public AppUser getInitiator_user() {
        return initiator_user;
    }

    public void setInitiator_user(AppUser initiator_user) {
        this.initiator_user = initiator_user;
    }

    public RequestDog getRequestDog() {
        return requestDog;
    }

    public void setRequestDog(RequestDog requestDog) {
        this.requestDog = requestDog;
    }
}
