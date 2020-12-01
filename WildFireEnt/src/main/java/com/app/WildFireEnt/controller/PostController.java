package com.app.WildFireEnt.controller;

import com.app.WildFireEnt.model.Post;
import com.app.WildFireEnt.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/blog/post")
public class PostController {

    @Autowired
    private BlogService blogService;

    @GetMapping(value = "/list", produces = "application/json")
    public List<Post> getList() {
        return blogService.getList();
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public Post getPost(@PathVariable UUID id) {
        return blogService.getPost(id);
    }

    @PostMapping(value = "/add", consumes = "application/json", produces = "application/json")
    public HashMap<String, Boolean> addPost(@RequestBody Post newPost) {
        HashMap<String, Boolean> response = new HashMap<>();
        boolean success = blogService.addPost(newPost);
        response.put("add", success);
        return response;
    }

    @PutMapping(value = "/update", consumes = "application/json", produces = "application/json")
    public HashMap<String, Boolean> updatePost(@RequestBody Post updatePost) {
        HashMap<String, Boolean> response = new HashMap<>();
        boolean success = blogService.addPost(updatePost);
        response.put("update", success);
        return response;
    }

    @DeleteMapping(value = "/delete/{id}", produces = "application/json")
    public HashMap<String, Boolean> deletePost(@PathVariable UUID id) {
        HashMap<String, Boolean> response = new HashMap<>();
        boolean success = blogService.deletePost(id);
        response.put("delete", success);
        return response;
    }
}
