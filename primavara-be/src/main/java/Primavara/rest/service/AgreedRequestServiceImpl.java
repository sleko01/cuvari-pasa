package Primavara.rest.service;

import Primavara.rest.domain.AgreedRequest;
import Primavara.rest.domain.AppUser;
import Primavara.rest.domain.RequestDog;
import Primavara.rest.domain.RequestGuardian;
import Primavara.rest.repository.AgreedRequestRepository;
import Primavara.rest.repository.AppUserRepository;
import Primavara.rest.repository.RequestDogRepository;
import Primavara.rest.repository.RequestGuardianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgreedRequestServiceImpl implements AgreedRequestService{

    @Autowired
    private AgreedRequestRepository agreedRequestRepository;

    @Autowired
    private RequestDogRepository requestDogRepository;

    @Autowired
    private RequestGuardianRepository requestGuardianRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public void initiateToRequestDog(Long idReqDog, Long idInitiator) {
        if (requestDogRepository.countByRequestDogId(idReqDog) == 0)
            throw new RequestDeniedException(
                    "RequestDog with id " + idReqDog + " does not exists"
            );
        RequestDog requestDog = requestDogRepository.findByRequestDogId(idReqDog);
        if (appUserRepository.countByUserId(idInitiator) == 0)
            throw new RequestDeniedException(
                    "User with id " + idInitiator + " does not exists"
            );
        if (idInitiator == requestDog.getAppUser().getUserId())
            throw new RequestDeniedException(
                    "Can not initiate on your own request"
            );

        AgreedRequest agreedRequest = new AgreedRequest();
        agreedRequest.setAgreed(false);
        agreedRequest.setAgreedTimeBegin(requestDog.getDogTimeBegin());
        agreedRequest.setAgreedTimeEnd(requestDog.getDogTimeEnd());
        agreedRequest.setRequestGuardian(null);
        agreedRequest.setRequestDog(requestDog);
        agreedRequest.setInitiatorUser(appUserRepository.findByUserId(idInitiator));
        agreedRequest.setAppUser(requestDog.getAppUser());
        agreedRequest.setInitiatorRated(false);
        agreedRequest.setUserRated(false);
        agreedRequestRepository.save(agreedRequest);
    }

    @Override
    public void initiateToRequestGuardian(Long idReqGua, Long idInitiator) {
        if (requestGuardianRepository.countByRequestGuardianId(idReqGua) == 0)
            throw new RequestDeniedException(
                    "RequestDog with id " + idReqGua + " does not exists"
            );
        RequestGuardian requestGuardian = requestGuardianRepository.findByRequestGuardianId(idReqGua);
        if (appUserRepository.countByUserId(idInitiator) == 0)
            throw new RequestDeniedException(
                    "User with id " + idInitiator + " does not exists"
            );
        if (idInitiator == requestGuardian.getAppUser().getUserId())
            throw new RequestDeniedException(
                    "Can not initiate on your own request"
            );

        AgreedRequest agreedRequest = new AgreedRequest();
        agreedRequest.setAgreed(false);
        agreedRequest.setAgreedTimeBegin(requestGuardian.getGuardTimeBegin());
        agreedRequest.setAgreedTimeEnd(requestGuardian.getGuardTimeEnd());
        agreedRequest.setRequestGuardian(requestGuardian);
        agreedRequest.setRequestDog(null);
        agreedRequest.setInitiatorUser(appUserRepository.findByUserId(idInitiator));
        agreedRequest.setAppUser(requestGuardian.getAppUser());
        agreedRequest.setInitiatorRated(false);
        agreedRequest.setUserRated(false);
        agreedRequestRepository.save(agreedRequest);
    }

    @Override
    public void responseToRequest(Long idUser, Long idRequest) {
        if (agreedRequestRepository.countByAgreedRequestId(idRequest) == 0)
            throw new RequestDeniedException(
                    "AgreedRequest with id " + idRequest + " does not exists"
            );
        if (appUserRepository.countByUserId(idUser) == 0)
            throw new RequestDeniedException(
                    "User with id " + idUser + " does not exists"
            );

        AgreedRequest agreedRequest = agreedRequestRepository.findByAgreedRequestId(idRequest);
        if (appUserRepository.findByUserId(idUser).getUserId() != agreedRequest.getAppUser().getUserId())
            throw new RequestDeniedException(
                    "Not the right user to respond"
            );
        agreedRequest.setAgreed(true);
        agreedRequestRepository.save(agreedRequest);
    }

}
