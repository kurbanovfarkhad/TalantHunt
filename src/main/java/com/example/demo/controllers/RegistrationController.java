package com.example.demo.controllers;

import com.example.demo.domain.User;
import com.example.demo.services.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("registration")
public class RegistrationController {

    @Autowired
    private final UserManagementService userManagementService;

    public RegistrationController(UserManagementService userManagementService) {
        this.userManagementService = userManagementService;
    }

    @PostMapping
    public String registration( User user, Model model){
        if(userManagementService.isVacant(user)){
            userManagementService.registration(user);
            return "redirect:/login";
        }else {
            model.addAttribute("error",false);
            return "registration";
        }
    }

}
