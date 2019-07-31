package com.example.demo.services;

import com.example.demo.domain.User;

import java.util.List;

public interface UserManagementService {
    boolean isVacant(User user);
    List<User> getAll();
    User registration(User user);
    User update(User userDb, User user);
}
