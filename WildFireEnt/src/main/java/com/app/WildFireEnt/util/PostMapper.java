package com.app.WildFireEnt.util;

import com.app.WildFireEnt.model.Post;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class PostMapper implements RowMapper<Post> {
    @Override
    public Post mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Post(
                (UUID) resultSet.getObject("post_id"),
                resultSet.getString("title"),
                resultSet.getDate("post_date"),
                resultSet.getDate("edit_date"),
                resultSet.getString("post")
        );
    }
}
