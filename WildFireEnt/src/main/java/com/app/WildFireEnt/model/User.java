package com.app.WildFireEnt.model;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID user_id;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;

    @Column(name = "register_date")
    private Date register_date;

    @Column(name = "enabled")
    private Boolean enabled;

    public User() {
    }

    public User(UUID user_id, String email, String username, String password, String role, Date register_date, Boolean enabled) {
        this.user_id = user_id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
        this.register_date = register_date;
        this.enabled = enabled;
    }

    public User(String email, String username, String password, String role, Date register_date, Boolean enabled) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
        this.register_date = register_date;
        this.enabled = enabled;
    }

    public UUID getUser_id() {
        return user_id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public Date getRegister_date() {
        return register_date;
    }

    public Boolean getEnabled() {
        return enabled;
    }
}
