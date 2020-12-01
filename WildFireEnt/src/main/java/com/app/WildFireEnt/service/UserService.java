package com.app.WildFireEnt.service;

import com.app.WildFireEnt.model.User;
import com.app.WildFireEnt.util.UserMapper;
import org.jasypt.util.password.StrongPasswordEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final StrongPasswordEncryptor encryptor = new StrongPasswordEncryptor();

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    public HashMap<String, Object> createUser(User newUser) {
        String sql = "INSERT INTO users (user_id, email, username, password, role, register_date, enabled) VALUES (?, ?, ?, ?, ?, ?, ?)";
        String check = "SELECT EXISTS (SELECT 1 FROM users WHERE email = ? OR username = ?)";
        HashMap<String, Object> success = new HashMap<>();

        try {
            String email = newUser.getEmail();
            String username = newUser.getUsername();
            List<Boolean> resultSet = jdbcTemplate.queryForList(check, new Object[]{email, username}, Boolean.class);
            boolean result = resultSet.get(0);
            if (!result) {
                UUID user_id = UUID.randomUUID();
                String encodedPassword = encryptor.encryptPassword(newUser.getPassword());
                Date register_date = new Date();
                String role = newUser.getRole();
                jdbcTemplate.update(sql, user_id, email, username, encodedPassword, role, register_date, Boolean.TRUE);
                success.put("result", Boolean.TRUE);
                success.put("message", "Successfully added user");
                log.info("Created account at {}.", new Date());
            } else {
                log.info(String.valueOf(resultSet.get(0)));
                throw new Exception("Email or username already exists.");
            }
        } catch (DataAccessException accessException) {
            success.put("result", Boolean.FALSE);
            success.put("message", accessException.getMessage());
            log.warn("DATA: " + accessException.getMessage());

        } catch (Exception e) {
            success.put("result", Boolean.FALSE);
            success.put("message", e.getMessage());
            log.warn("Exception:" + e.getMessage());
        }
        return success;
    }

    public HashMap<String, Object> processLogin(User loginUser) {
        String check = "SELECT EXISTS (SELECT 1 FROM users WHERE username = ?)";
        String sql = "SELECT * FROM users WHERE username = ?";
        HashMap<String, Object> success = new HashMap<>();

        try {
            String loginUsername = loginUser.getUsername();
            String loginPassword = loginUser.getPassword();
            List<Boolean> listResults = jdbcTemplate.queryForList(check, new Object[]{loginUsername}, Boolean.class);

            if (listResults.get(0)) {
                User checkUser = jdbcTemplate.queryForObject(sql, new Object[]{loginUsername}, new UserMapper());
                if (checkUser.getEnabled()) {
                    if (encryptor.checkPassword(loginPassword, checkUser.getPassword())){
                        success.put("result", Boolean.TRUE);
                        success.put("id", checkUser.getUser_id());
                        success.put("role", checkUser.getRole());
                        success.put("message", "Login successful");
                        log.info("Login successful");
                    } else {
                        success.put("result", Boolean.FALSE);
                        success.put("message", "Password and/or username does not match");
                        log.warn("Password and/or username does not match");
                    }
                } else {
                    throw new NullPointerException();
                }
            } else {
                success.put("result", Boolean.FALSE);
                success.put("message", "Account with username does not exist.");
                log.warn("Account with username ('{}') does not exist.", loginUsername);
            }

        } catch (DataAccessException accessException) {
            success.put("result", Boolean.FALSE);
            success.put("message", "Login Error");
            log.warn(accessException.getMessage());
        } catch (NullPointerException nullPointerException) {
            success.put("result", Boolean.FALSE);
            success.put("message", "Disabled account");
            log.warn("disabled account");
        }

        return success;
    }

    public HashMap<String, Object> updateUser(User updateUser) {
        String sql = "UPDATE users SET email = ?, username = ?, password = ?, role = ? WHERE user_id = ?";
        HashMap<String, Object> success = new HashMap<>();

        try {
            String email = updateUser.getEmail();
            String username = updateUser.getUsername();
            String updatePassword = encryptor.encryptPassword(updateUser.getPassword());
            String role = updateUser.getRole();
            UUID id = updateUser.getUser_id();
            jdbcTemplate.update(sql, email, username, updatePassword, role, id);
            success.put("result", Boolean.TRUE);
            success.put("message", "Update successful");
            log.info("Successfully updated {} at {}.", username, new Date());
        } catch (DataAccessException accessException) {
            success.put("result", Boolean.FALSE);
            success.put("message", "Update failed");
            log.warn(accessException.getMessage());
        }

        return success;
    }

    public HashMap<String, Object> getUser(UUID id) {
        String sql = "SELECT * FROM users WHERE user_id = ?";
        HashMap<String, Object> response = new HashMap<>();

        try {
            User target = jdbcTemplate.queryForObject(sql, new Object[]{id}, new UserMapper());
            response.put("result", Boolean.TRUE);
            response.put("username", target.getUsername());
            response.put("email", target.getEmail());
            log.info("Retrieved {} at {}.", target.getUsername(), new Date());
        } catch (DataAccessException accessException) {
            response.put("result", Boolean.FALSE);
            response.put("message", accessException.getMessage());
            log.warn(accessException.getMessage());
        }

        return response;
    }

    public List<User> getListUsers() {
        String sql = "SELECT * FROM users";
        List<User> list = new ArrayList<>();

        try {
            list = jdbcTemplate.query(sql, new UserMapper());
        } catch (DataAccessException accessException) {
            log.warn(accessException.getMessage());
        }

        return list;
    }

    public HashMap<String, Object> deleteUser(UUID id) {
        String sql = "UPDATE users (enabled) VALUES (false) WHERE user_id = ?";
        HashMap<String, Object> success = new HashMap<>();

        try {
            jdbcTemplate.update(sql, id);
            success.put("result", Boolean.TRUE);
            success.put("message", "Deleted User");
            log.info("Account ({}) disabled at {}.", id, new Date());
        } catch (DataAccessException accessException) {
            log.warn(accessException.getMessage());
            success.put("result", Boolean.FALSE);
            success.put("message", "Failed to delete user.");
        }

        return success;
    }
}
