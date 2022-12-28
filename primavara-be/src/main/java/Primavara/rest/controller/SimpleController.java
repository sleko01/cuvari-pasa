package Primavara.rest.controller;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("check")
public class SimpleController {
    @PostMapping("")
    public String healthcheck(){
        return "ok";
    }
}
