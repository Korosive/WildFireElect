package com.app.WildFireEnt.util;

import com.app.WildFireEnt.model.Product;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class ProductMapper implements RowMapper<Product> {

    @Override
    public Product mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Product(
                (UUID) resultSet.getObject("product_id"),
                resultSet.getBytes("image"),
                resultSet.getString("name"),
                resultSet.getString("description"),
                resultSet.getArray("features"),
                resultSet.getDate("add_date"),
                resultSet.getDouble("price")
        );
    }
}
