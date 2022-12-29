package Primavara.rest.service;

public interface AgreedRequestService {

    void initiateToRequestDog(Long idReqDog, Long idInitiator);

    void initiateToRequestGuardian(Long idReqGua, Long idInitiator);

    void responseToRequest(Long idUser, Long idRequest);

    void initiateToAgreedRequestByBestOption(Long idReqGua, Long idReqDog, Long idInitiator);
}
