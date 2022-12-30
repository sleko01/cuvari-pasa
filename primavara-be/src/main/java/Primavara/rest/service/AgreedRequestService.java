package Primavara.rest.service;

import Primavara.rest.domain.RequestDog;
import Primavara.rest.domain.RequestGuardian;

public interface AgreedRequestService {

    void initiateToRequestDog(Long idReqDog, Long idInitiator);

    void initiateToRequestGuardian(Long idReqGua, Long idInitiator);

    void responseToRequest(Long idUser, Long idRequest);

    void initiateToAgreedRequestByBestOption(Long idReqGua, Long idReqDog, Long idInitiator);

    RequestGuardian getBestRequestGuardian(Long idReqDog);

    RequestDog getBestRequestDog(Long idReqGua);
}
