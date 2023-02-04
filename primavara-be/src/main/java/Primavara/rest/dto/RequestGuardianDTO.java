package Primavara.rest.dto;

import Primavara.rest.domain.AgreedRequest;
import Primavara.rest.domain.AppUser;
import Primavara.rest.domain.RequestGuardian;

public class RequestGuardianDTO {

    private AppUser initiator_user;

    private RequestGuardian requestGuardian;

    public RequestGuardianDTO() {
    }

    public RequestGuardianDTO(AppUser initiator_user, RequestGuardian requestGuardian) {
        this.initiator_user = initiator_user;
        this.requestGuardian = requestGuardian;
    }

    public AppUser getInitiator_user() {
        return initiator_user;
    }

    public void setInitiator_user(AppUser initiator_user) {
        this.initiator_user = initiator_user;
    }

    public RequestGuardian getRequestGuardian() {
        return requestGuardian;
    }

    public void setRequestGuardian(RequestGuardian requestGuardian) {
        this.requestGuardian = requestGuardian;
    }

}
