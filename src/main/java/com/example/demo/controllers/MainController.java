package com.example.demo.controllers;

import com.example.demo.domain.Car;
import com.example.demo.domain.User;
import com.example.demo.services.CarService;
import com.example.demo.services.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping
public class MainController {
    private  final UserManagementService userManagementService;
    private final CarService carService;

    @Autowired
    public MainController(UserManagementService userManagementService, CarService carService) {
        this.userManagementService = userManagementService;
        this.carService = carService;
    }

    @GetMapping
    public String main(Model model, @AuthenticationPrincipal User user){
        HashMap<Object, Object> data = new HashMap<>();
        if (user!=null){
            data.put("profile", user);
            data.put("cars",carService.getAll());
        }
        model.addAttribute("frontendData", data);
        return "index";
    }
    @GetMapping("registration")
    public String registration(){
        return "registration";
    }

    @GetMapping("admin")
    public String admin(Model model, @AuthenticationPrincipal User user){
        HashMap<Object, Object> data = new HashMap<>();
        data.put("profile", user);
        data.put("users",userManagementService.getAll());

        model.addAttribute("frontendData", data);
        return "admin";
    }


}