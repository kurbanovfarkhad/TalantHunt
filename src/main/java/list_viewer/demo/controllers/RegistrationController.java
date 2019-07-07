package list_viewer.demo.controllers;

import list_viewer.demo.domain.CommonUser;
import list_viewer.demo.domain.Role;
import list_viewer.demo.repo.CUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("registration")
public class RegistrationController {
    @Autowired
    private final CUserRepo userRepo;

    public RegistrationController(CUserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping
    public HttpStatus addUser(@RequestBody CommonUser user){
        user.setActive(true);
        user.setRoles(Collections.singleton(Role.USER));
        userRepo.save(user);
        return HttpStatus.ACCEPTED;
    }
}
