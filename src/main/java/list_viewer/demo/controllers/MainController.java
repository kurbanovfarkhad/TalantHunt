package list_viewer.demo.controllers;

import list_viewer.demo.domain.User;
import list_viewer.demo.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.HashMap;

@Controller
@RequestMapping
public class MainController {
    @Autowired
    private final CarService carService;


    public MainController(CarService carService) {
        this.carService = carService;
    }
    @GetMapping
    public String main(Model model, @AuthenticationPrincipal User user){
        HashMap<Object, Object> data = new HashMap<>();
        data.put("profile", user);
        data.put("cars",carService.getAll());
        model.addAttribute("frontendData", data);
        return "index";
    }
}
