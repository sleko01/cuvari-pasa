package Primavara.rest.service;

import Primavara.rest.domain.*;
import Primavara.rest.dto.RequestBothDTO;
import Primavara.rest.dto.RequestDogDTO;
import Primavara.rest.dto.RequestGuardianDTO;
import Primavara.rest.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.*;

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

    @Autowired
    private RequestGuardiansDogRepository requestGuardiansDogRepository;

    @Autowired
    private DogRepository dogRepository;

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
        agreedRequest.setAgreed(null);
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
        agreedRequest.setAgreed(null);
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
    public void responseToRequest(Long idUser, Long idRequest, Long value) {
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

        if (value == 1)
            agreedRequest.setAgreed(true);
        else
            agreedRequest.setAgreed(false);
        agreedRequestRepository.save(agreedRequest);
    }

    @Override
    public void initiateToAgreedRequestByBestOption(Long idReqGua, Long idReqDog, Long idInitiator) {
        if (requestDogRepository.countByRequestDogId(idReqDog) == 0)
            throw new RequestDeniedException(
                    "RequestDog with id " + idReqDog + " does not exists"
            );
        if (requestGuardianRepository.countByRequestGuardianId(idReqGua) == 0)
            throw new RequestDeniedException(
                    "RequestGuardian with id " + idReqGua + " does not exists"
            );
        RequestDog requestDog = requestDogRepository.findByRequestDogId(idReqDog);
        RequestGuardian requestGuardian = requestGuardianRepository.findByRequestGuardianId(idReqGua);
        if (appUserRepository.countByUserId(idInitiator) == 0)
            throw new RequestDeniedException(
                    "User with id " + idInitiator + " does not exists"
            );
        Long prvi = requestDog.getAppUser().getUserId();
        Long drugi = requestGuardian.getAppUser().getUserId();
        if (!(((idInitiator != prvi && idInitiator == drugi) || (idInitiator == prvi && idInitiator != drugi)) && prvi != drugi))
            throw new RequestDeniedException(
                    "Can not initiate on your own request"
            );
        AgreedRequest agreedRequest = new AgreedRequest();
        agreedRequest.setAgreed(null);
        agreedRequest.setAgreedTimeBegin(requestDog.getDogTimeBegin());
        agreedRequest.setAgreedTimeEnd(requestDog.getDogTimeEnd());
        agreedRequest.setRequestGuardian(requestGuardian);
        agreedRequest.setRequestDog(requestDog);
        agreedRequest.setInitiatorUser(appUserRepository.findByUserId(idInitiator));
        if (idInitiator != requestDog.getAppUser().getUserId())
            agreedRequest.setAppUser(requestDog.getAppUser());
        else
            agreedRequest.setAppUser(requestGuardian.getAppUser());
        agreedRequest.setInitiatorRated(false);
        agreedRequest.setUserRated(false);
        agreedRequestRepository.save(agreedRequest);
    }

    @Override
    public RequestGuardian getBestRequestGuardian(Long idReqDog) {
        if (requestDogRepository.countByRequestDogId(idReqDog) == 0)
            throw new RequestDeniedException(
                    "RequestDog with id " + idReqDog + " does not exists"
            );
        RequestDog requestDog = requestDogRepository.findByRequestDogId(idReqDog);
        //dobavi sve RequestGuardian koji su reviewani i publishani i nisu tvoji i ne nalaze se u agreed_requests u kojem za taj redak isAgreed je false
        List<Optional<RequestGuardian>> requestGuardians = requestGuardianRepository.findAllReviewedAndPublishedAndNotMineAndNotAgreed(requestDog.getAppUser().getUserId());
        Double minPoints = 0D;
        Long idBest = -1L;
        for (int i = 0; i < requestGuardians.size(); i++) {
            RequestGuardian current = requestGuardians.get(i).get();
            Double points = compare(requestDog, current);
            if (idBest == -1 || minPoints > points) {
                minPoints = points;
                idBest = current.getRequestGuardianId();
            }
        }
        return requestGuardianRepository.findByRequestGuardianId(idBest);
    }

    @Override
    public RequestDog getBestRequestDog(Long idReqGua) {
        if (requestGuardianRepository.countByRequestGuardianId(idReqGua) == 0)
            throw new RequestDeniedException(
                    "RequestGuardian with id " + idReqGua + " does not exists"
            );
        RequestGuardian requestGuardian = requestGuardianRepository.findByRequestGuardianId(idReqGua);
        //dobavi sve RequestDog koji su reviewani i publishani i nisu tvoji i ne nalaze se u agreed_requests u kojem za taj redak isAgreed je false
        List<Optional<RequestDog>> requestDogs = requestDogRepository.findAllReviewedAndPublishedAndNotMineAndNotAgreed(requestGuardian.getAppUser().getUserId());
        Double minPoints = 0D;
        Long idBest = -1L;
        for (int i = 0; i < requestDogs.size(); i++) {
            RequestDog current = requestDogs.get(i).get();
            Double points = compare(current, requestGuardian);
            if (idBest == -1 || minPoints > points) {
                minPoints = points;
                idBest = current.getRequestDogId();
            }
        }
        return requestDogRepository.findByRequestDogId(idBest);
    }

    @Override
    public HashMap<Long, List> getMyOffers(Long id) {

        HashMap<Long, List> map = new HashMap<>();
        List<RequestGuardianDTO> list1 = agreedRequestRepository.findAllMyOffers(id);
        map.put(1L, list1);
        List<RequestDogDTO> list2 = agreedRequestRepository.findAllMyOffers2(id);
        map.put(2L, list2);
        List<RequestBothDTO> list3 = agreedRequestRepository.findAllMyOffers3(id);
        map.put(3L, list3);
        return map;
    }

    private Double compare(RequestDog requestDog, RequestGuardian requestGuardian) {
        Double result = 0D;

        //starost pasa
        List<Long> idDogs = requestGuardiansDogRepository.findALlIdsByRequestGuardianId(requestGuardian.getRequestGuardianId());
        LocalDate curDate = LocalDate.now();
        Double preferedAge = (double) requestDog.getDogAge();
        for (int i = 0; i < idDogs.size(); i++) {
            Date dateOfBirth = dogRepository.findByDogId(idDogs.get(i)).getDateOfBirth();
            Long breedId = dogRepository.findByDogId(idDogs.get(i)).getBreed().getBreedId();
            //pasmina
            if (breedId != requestDog.getBreed().getBreedId())
                result += 0.1;
            Double years = (double) Period.between(Instant.ofEpochMilli(dateOfBirth.getTime()).atZone(ZoneId.systemDefault()).toLocalDate(), curDate).getYears();
            result += Math.abs(preferedAge - years) / 5;
        }
        if (idDogs.size() != 0)
            result /= idDogs.size();

        //koliko pasa
        result += Math.abs(requestDog.getNumberOfDogs() - requestGuardian.getNumberOfDogs()) / 2;

        //lokacija
        String s1 = requestGuardian.getLocation();
        String s2 = requestDog.getLocation();
        String [] reqGuaLoc = s1.split("|");
        String [] reqDogLoc = s2.split("|");
        result += distance(Double.valueOf(reqGuaLoc[0]), Double.valueOf(reqGuaLoc[1]), Double.valueOf(reqDogLoc[0]), Double.valueOf(reqDogLoc[1])) / 2;

        //vremenski period
        Timestamp start1 = requestDog.getDogTimeBegin();
        Timestamp end1 = requestDog.getDogTimeEnd();
        Timestamp start2 = requestGuardian.getGuardTimeBegin();
        Timestamp end2 = requestGuardian.getGuardTimeEnd();
        if (!((start1.before(start2) && end2.before(end1)) || (start1.before(start2) && start2.before(end1))
            || (start2.before(start1) && end1.before(end2)) || (start2.before(start1) && start1.before(end2)))) {

            if (requestDog.getFlexible() == false)
                result += (start1.getTime() - start2.getTime()) / (1000 * 60 * 60) / 2;
            else
                result += (start1.getTime() - start2.getTime()) / (1000 * 60 * 60 * 24) / 2;
        }

        //iskustvo
        if (requestGuardian.getHasExperience() == true && requestDog.getAppUser().getHasExperience() != true)
            result += 2;

        //ima li psa
        if (requestGuardian.getHasDog() == true && requestDog.getAppUser().getHasDog() != true)
            result += 2;

        return result;
    }
    private Double distance(Double lat1, Double lon1, Double lat2, Double lon2) {
        Double R = 6371.0;
        Double dLat = Math.toRadians(lat2 - lat1);
        Double dLon = Math.toRadians(lon2 - lon1);
        lat1 = Math.toRadians(lat1);
        lat2 = Math.toRadians(lat2);
        Double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        Double d = R * c;
        return d;
    }

}
