package com.app.WildFireEnt.controller;

import com.app.WildFireEnt.model.User;
import com.app.WildFireEnt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/profile")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public HashMap<String, Object> checkLogin(@RequestBody User loginUser) {
        return userService.processLogin(loginUser);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public HashMap<String, Object> getUser(@PathVariable("id") UUID id) {
        return userService.getUser(id);
    }

    @GetMapping(value = "/list", produces = "application/json")
    public List<User> getListUsers() {
        return userService.getListUsers();
    }

    @PostMapping(value = "/add", consumes = "application/json", produces = "application/json")
    public HashMap<String, Object> addUser(@RequestBody User newUser) {
        return userService.createUser(newUser);
    }

    @PutMapping(value = "/update", consumes = "application/json", produces = "application/json")
    public HashMap<String, Object> updateUser(@RequestBody User updateUser) {
        return userService.updateUser(updateUser);
    }

    @DeleteMapping(value = "/delete/{id}", consumes = "application/json", produces = "application/json")
    public HashMap<String, Object> deleteUser(@PathVariable UUID id) {
        return userService.deleteUser(id);
    }
}
