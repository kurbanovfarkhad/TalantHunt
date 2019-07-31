package com.example.demo.services.impl;

import com.example.demo.domain.Role;
import com.example.demo.domain.User;
import com.example.demo.repo.UserRepository;
import com.example.demo.services.UserManagementService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserManagementImpl implements UserManagementService {


    @Autowired
    private final UserRepository userRepository;

    public UserManagementImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isVacant(User user){
        return userRepository.findByUsername(user.getUsername())==null;
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User registration(User user) {
        user.setActive(true);
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        if (user.getUsername().equals("fara")){
            user.setRoles(Collections.singleton(Role.ADMIN));
        }else{
            user.setRoles(Collections.singleton(Role.USER));
        }
        return userRepository.save(user);

    }

    @Override
    public User update(User userDb, User user) {
        userDb.setActive(user.isActive());
        userDb.setRoles(user.getRoles());
        return userRepository.save(userDb);
    }

}
