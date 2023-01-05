package Primavara.rest.service;

import Primavara.rest.domain.*;
import Primavara.rest.dto.NewRequestGuardian;
import Primavara.rest.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class RequestGuardianServiceImpl implements RequestGuardianService {
    @Autowired
    private RequestGuardianRepository requestGuardianRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private DogRepository dogRepository;

    @Autowired
    private RequestGuardiansDogRepository requestGuardiansDogRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private RequestActivityRepository requestActivityRepository;

    @Override
    public List<Optional<RequestGuardian>> getAllReviewedAndPublishedRequestGuardians() {
        return requestGuardianRepository.findAllReviewedAndPublishedAndNotGone();
    }

    @Override
    public List<Optional<RequestGuardian>> getAllReviewedAndPublishedRequestGuardiansAndMine(Long id) {
        return requestGuardianRepository.findAllReviewedAndPublishedAndNotGoneAndMine(id);
    }

    @Override
    public List<Optional<RequestGuardian>> getAllReviewedAndPublishedRequestGuardiansAndNotInitiatedByMe(Long id) {
        return requestGuardianRepository.findAllReviewedAndPublishedAndNotGoneAndNotInitiatedByMe(id);
    }

    @Override
    public void addNewRequestGuardian(NewRequestGuardian newRequestGuardian, Long id){
        validate(newRequestGuardian);
        Long counter=0L;
        if (appUserRepository.findByUserId(id) == null)
            throw new RequestDeniedException(
                    "AppUser with id " + id + " does not exists"
            );

        AppUser appUser=appUserRepository.findByUserId(id);

        if (appUser.getRole().getRoleId() == 2)
            throw new RequestDeniedException(
                    "Guardian can not add new RequestGuardian"
            );

        for(Long dogId: newRequestGuardian.getDogId()){
            if(!dogRepository.findUserIdByDogId(dogId).equals(id)){
                throw new RequestDeniedException(
                        "Dog with id " + dogId + " is not owned by user with id " + id
                );
            }
            counter++;
        }

        if(!counter.equals(newRequestGuardian.getNumberOfDogs())){
            throw new RequestDeniedException(
                    "Specified " + newRequestGuardian.getNumberOfDogs() + " dogs, but provided " +
                            counter + " dogs"
            );
        }

        RequestGuardian requestGuardian=new RequestGuardian();
        requestGuardian.setLocation(newRequestGuardian.getLocation());
        requestGuardian.setLocationName(newRequestGuardian.getLocationName());
        requestGuardian.setNumberOfDogs(newRequestGuardian.getNumberOfDogs());
        if (java.time.LocalDate.now().isAfter(newRequestGuardian.getGuardTimeBegin().toLocalDateTime().toLocalDate()))
            throw new RequestDeniedException(
                    "Date of beginning must be in the future"
            );
        requestGuardian.setGuardTimeBegin(newRequestGuardian.getGuardTimeBegin());
        if (java.time.LocalDate.now().isAfter(newRequestGuardian.getGuardTimeEnd().toLocalDateTime().toLocalDate()))
            throw new RequestDeniedException(
                    "Date of ending must be in the future"
            );
        requestGuardian.setGuardTimeEnd(newRequestGuardian.getGuardTimeEnd());
        if (newRequestGuardian.getGuardTimeBegin().toLocalDateTime().toLocalDate().isAfter(newRequestGuardian.getGuardTimeEnd().toLocalDateTime().toLocalDate()))
            throw new RequestDeniedException(
                    "Date of beginning must be before date of ending"
            );
        requestGuardian.setHasExperience(newRequestGuardian.getHasExperience());
        requestGuardian.setHasDog(newRequestGuardian.getHasDog());

        requestGuardian.setPublished(false);
        requestGuardian.setReviewed(false);

        requestGuardian.setAppUser(appUser);

        requestGuardianRepository.save(requestGuardian);

        for(Long dogId: newRequestGuardian.getDogId()){
            RequestGuardiansDog requestGuardiansDog = new RequestGuardiansDog();
            requestGuardiansDog.setRequestGuardian(requestGuardian);
            Dog dog=dogRepository.findByDogId(dogId);
            requestGuardiansDog.setDog(dog);
            requestGuardiansDogRepository.save(requestGuardiansDog);
        }

        for(Long activityId: newRequestGuardian.getActivityId()){
            RequestActivity requestActivity = new RequestActivity();
            requestActivity.setRequestGuardian(requestGuardian);
            Activity activity=activityRepository.findByActivityId(activityId);
            requestActivity.setActivity(activity);
            if(activity.getActivityName().equals("Hranjenje")){
                requestActivity.setFeedingQuantity(newRequestGuardian.getQuantity());
            }else{
                requestActivity.setFeedingQuantity(0L);
            }
            requestActivityRepository.save(requestActivity);
        }
    }

    //validacija
    private void validate(NewRequestGuardian newRequestGuardian) {
        Assert.notNull(newRequestGuardian, "NewRequestGuardian object must be given");
        Assert.hasText(newRequestGuardian.getLocation(), "NewRequestGuardian location must be given");
        Assert.hasText(newRequestGuardian.getNumberOfDogs().toString(), "NewRequestGuardian numberOfDogs must be given");
        Assert.notNull(newRequestGuardian.getGuardTimeBegin(), "NewRequestGuardian guardTimeBegin must be given");
        Assert.notNull(newRequestGuardian.getGuardTimeEnd(), "NewRequestGuardian guardTimeEnd must be given");
        Assert.notNull(newRequestGuardian.getHasExperience(), "NewRequestGuardian hasExperience must be given");
        Assert.notNull(newRequestGuardian.getHasDog(), "NewRequestGuardian hasDog must be given");
        Assert.notNull(newRequestGuardian.getLocationName(), "NewRequestGuardian locationName must be given");

        for(Long dogId: newRequestGuardian.getDogId()){
            if(dogRepository.findByDogId(dogId)==null){
                throw new RequestDeniedException(
                        "Dog with id " + dogId + " does not exist"
                );
            }
        }

        for(Long activityId: newRequestGuardian.getActivityId()){
            if(activityRepository.findByActivityId(activityId)==null){
                throw new RequestDeniedException(
                        "Activity with id " + activityId + " does not exist"
                );
            }
        }
    }

    @Override
    public List<Optional<RequestGuardian>> getAllRequestGuardiansByUserId(Long id){
        AppUser appUser=appUserRepository.findByUserId(id);
        if(appUser.getRole().getRoleId()==2){
            throw new RequestDeniedException(
                    "User with role " + appUser.getRole().getName() + " cannot access RequestGuardians"
            );
        }

        return requestGuardianRepository.findAllByUserId(id);
    }
}
