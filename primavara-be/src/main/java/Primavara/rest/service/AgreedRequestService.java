package Primavara.rest.service;

import Primavara.rest.domain.Dog;
import Primavara.rest.domain.RequestDog;
import Primavara.rest.domain.RequestGuardian;
import Primavara.rest.dto.RatedRequestsDTO;
import org.springframework.data.util.Pair;

import java.util.*;

import java.util.HashMap;
import java.util.List;

public interface AgreedRequestService {

    void initiateToRequestDog(Long idReqDog, Long idInitiator);

    void initiateToRequestGuardian(Long idReqGua, Long idInitiator);

    void responseToRequestGuardian(Long idInitiator, Long idUser, Long idRequest, Long value);

    void responseToRequestDog(Long idInitiator, Long idUser, Long idRequest, Long value);

    void initiateToAgreedRequestByBestOption(Long idReqGua, Long idReqDog, Long idInitiator);

    RequestGuardian getBestRequestGuardian(Long idReqDog);

    RequestDog getBestRequestDog(Long idReqGua);

    HashMap<Long, List> getMyOffers(Long id);

    List<RatedRequestsDTO> getMyRatedGuardians(Long id);

    List<RatedRequestsDTO> getMyRatedDogs(Long id);

    List<RatedRequestsDTO> getMyInProgressGuardians(Long id);

    List<RatedRequestsDTO> getMyInProgressDogs(Long id);

    List<Long> getDogsInRequest(Long reqGuaId);
}
