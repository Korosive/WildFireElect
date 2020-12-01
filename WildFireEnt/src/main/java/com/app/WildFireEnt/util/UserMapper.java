package com.app.WildFireEnt.util;

import com.app.WildFireEnt.model.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class UserMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet resultSet, int i) throws SQLException {
        return new User(
                resultSet.getObject("user_id", UUID.class),
                resultSet.getString("email"),
                resultSet.getString("username"),
                resultSet.getString("password"),
                resultSet.getString("role"),
                resultSet.getDate("register_date"),
                resultSet.getBoolean("enabled")
        );
    }
}
