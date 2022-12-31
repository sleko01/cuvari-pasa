package Primavara.rest.dto;

import Primavara.rest.domain.RequestDog;
import Primavara.rest.domain.RequestGuardian;

public class RequestBothDTO {

    private RequestDog requestDog;

    private RequestGuardian requestGuardian;

    public RequestBothDTO(RequestDog requestDog, RequestGuardian requestGuardian) {
        this.requestDog = requestDog;
        this.requestGuardian = requestGuardian;
    }

    public RequestDog getRequestDog() {
        return requestDog;
    }

    public void setRequestDog(RequestDog requestDog) {
        this.requestDog = requestDog;
    }

    public RequestGuardian getRequestGuardian() {
        return requestGuardian;
    }

    public void setRequestGuardian(RequestGuardian requestGuardian) {
        this.requestGuardian = requestGuardian;
    }
}
