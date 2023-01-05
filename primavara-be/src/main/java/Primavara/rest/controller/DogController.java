package Primavara.rest.controller;

import Primavara.rest.domain.Breed;
import Primavara.rest.domain.Dog;
import Primavara.rest.dto.RatedDogsList;
import Primavara.rest.dto.RegisterDog;
import Primavara.rest.service.DogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@RequestMapping("dogs")
public class DogController {

    @Autowired
    private DogService dogService;

    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VLASNIK', 'ROLE_ČUVAR', 'ROLE_VLASNIKČUVAR')")
//    @PutMapping("register/{id}")
    @RequestMapping(path = "register/{id}", method = PUT, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public void addDog(@ModelAttribute RegisterDog registerDog, @PathVariable(required = true) Long id){
        dogService.addDog(registerDog, id);
    }

    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_VLASNIK', 'ROLE_VLASNIKČUVAR')")
    @GetMapping("my/{id}")
    public List<Optional<Dog>> getAllMyDogs(@PathVariable(required = true) Long id) {
        return dogService.getAllMyDogs(id);
    }

    @GetMapping("breeds")
    public List<Optional<Breed>> getAllSortedBreeds() {
        return dogService.getAllSortedBreeds();
    }

    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_ČUVAR', 'ROLE_VLASNIKČUVAR')")
    @PostMapping("rate/{idInitiator}/{idUser}/{idRequest}/{type}")
    public void rateDogs(@RequestBody RatedDogsList ratedDogsList, @PathVariable Long idInitiator, @PathVariable Long idUser, @PathVariable Long idRequest, @PathVariable String type) {
        /*ObjectMapper mapper = new ObjectMapper();
        TypeReference<HashMap<Long, Long>> typeRef = new TypeReference<HashMap<Long, Long>>() {};
        HashMap<Long, Long> map = mapper.readValue(dogs, typeRef);*/
        HashMap<Long, Long> map = new HashMap<>();
        for (int i = 0; i < ratedDogsList.length(); i++) {
            map.put(ratedDogsList.getListId().get(i), ratedDogsList.getListValue().get(i));
        }
        dogService.rateDogs(idInitiator, idUser, idRequest, type, map);
    }

    @GetMapping("getPhoto/{id}")
    public String getPhoto(@PathVariable Long id) {
        String ime = dogService.getPhoto(id);
        System.out.println(ime + "asdasa");
        return ime;
    }
}
