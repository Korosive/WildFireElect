package com.app.WildFireEnt.service;

import com.app.WildFireEnt.model.Post;
import com.app.WildFireEnt.util.PostMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class BlogService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final Logger log = LoggerFactory.getLogger(BlogService.class);

    public Post getPost(UUID id) {
        String sql = "SELECT * FROM posts WHERE post_id = ?";
        Post targetPost;

        try {
            targetPost = jdbcTemplate.queryForObject(sql, new Object[]{id}, new PostMapper());
            log.info("Retrieved post with id ({}) at {}.", id, new Date());
        } catch (DataAccessException accessException) {
            targetPost = null;
            log.warn("Failed to retrieve post with id ({}) at {}. {}", id, new Date(), accessException.getMessage());
        }

        return targetPost;
    }

    public List<Post> getList() {
        String sql = "SELECT * FROM posts";
        List<Post> list = new ArrayList<>();

        try {
            list = jdbcTemplate.query(sql, new PostMapper());
            log.info("Retrieved list of posts at {}.", new Date());
        } catch (DataAccessException accessException) {
            log.warn("Failed to retrieve list of posts at {}. {}", new Date(), accessException.getMessage());
        }

        return list;
    }

    public boolean addPost(Post newPost) {
        String sql = "INSERT INTO posts (post_id, title, post_date, edit_date, post) VALUES (?, ?, ?, ?, ?)";
        boolean success = true;

        try {
            UUID postID = UUID.randomUUID();
            String title = newPost.getTitle();
            String post = newPost.getPost();
            jdbcTemplate.update(sql, postID, title, new Date(), new Date(), post);
            log.info("New post added at {}.", new Date());
        } catch (DataAccessException accessException) {
            success = false;
            log.warn("Failed to add new post {}. {}", new Date(), accessException.getMessage());
        }

        return success;
    }

    public boolean updatePost(Post newPost) {
        String sql = "UPDATE FROM posts (title, userID, editDate, post) VALUES (?, ?, ?, ?) WHERE post_id = ?";
        boolean success = true;

        try {
            UUID postID = newPost.getPostID();
            String title = newPost.getTitle();
            Date editDate = new Date();
            String post = newPost.getPost();
            jdbcTemplate.update(sql, title, editDate, post, postID);
            log.info("Updated post {}, at '{}'.", title, new Date());
        } catch (DataAccessException accessException) {
            success = false;
            log.info("Failed to update post at {}.", new Date());
        }

        return false;
    }

    public boolean deletePost(UUID postID) {
        String sql = "DELETE FROM posts WHERE postID = ?";
        boolean success = true;

        try {
            jdbcTemplate.update(sql, postID);
            log.info("Deleted post with id {} at {}.", postID, new Date());
        } catch (DataAccessException accessException) {
            success = false;
            log.error("Failed to delete {} at {}.", postID, new Date());
        }

        return success;
    }
}
