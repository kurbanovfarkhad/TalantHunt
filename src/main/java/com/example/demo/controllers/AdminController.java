package com.example.demo.controllers;

import com.example.demo.domain.User;
import com.example.demo.services.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin")
public class AdminController {
    @Autowired
    private final UserManagementService userManagementService;

    public AdminController(UserManagementService userManagementService) {
        this.userManagementService = userManagementService;
    }

    @PutMapping("{id}")
    public User update(
            @PathVariable("id") User userDb
            ,@RequestBody User user
    ){
        return userManagementService.update(userDb,user);
    }
}
