package com.app.WildFireEnt.service;

import com.app.WildFireEnt.model.Product;
import com.app.WildFireEnt.util.ProductMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.sql.*;
import java.util.*;
import java.util.Date;

@Service
public class ProductService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final Logger log = LoggerFactory.getLogger(ProductService.class);

    public Product getProduct(UUID productID) {
        String sql = "SELECT * FROM products WHERE product_id = ?";
        Product targetProduct;

        try {
            targetProduct = jdbcTemplate.queryForObject(sql, new Object[]{productID}, new ProductMapper());
            log.info("Retrieved product ({}) at {}.", productID, new Date());
        } catch (DataAccessException accessException) {
            targetProduct = null;
            log.warn("Failed to retrieve product ({}) at {}.", productID, new Date());
        }

        return targetProduct;
    }

    public List<Product> getList() {
        String sql = "SELECT * FROM products";
        List<Product> list = new ArrayList<>();

        try {
            list = jdbcTemplate.query(sql, new Object[]{}, new ProductMapper());
            log.info("Retrieved list at {}.", new Date());
        } catch (DataAccessException accessException) {
            log.warn("Failed to retrieve list at {}. {}", new Date(), accessException.getMessage());
        }

        return list;
    }

    public boolean addProduct(HashMap<String, String> newProduct) throws SQLException {
        String sql = "INSERT INTO products (product_id, image, name, description, features, add_date, price) VALUES (?, ?, ?, ?, ?, ?, ?)";
        boolean success = true;
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/WildFire", "postgres", "adminpassword");

        try {
            PreparedStatement statement = conn.prepareStatement(sql);
            UUID id = UUID.randomUUID();
            String list = newProduct.get("feature");
            list = list.replace("[[", "");
            list = list.replace("]]", "");
            String[] listFeatures = list.split(",");
            String name = newProduct.get("name");
            String description = newProduct.get("description");
            String image = newProduct.get("image");
            byte[] decode = Base64.getDecoder().decode(image);
            double price = Double.parseDouble(newProduct.get("price"));
            Date date = new Date();
            String[] newList = new String[listFeatures.length];
            for (int i = 0; i < listFeatures.length; i++) {
                String strFixed = listFeatures[i].replace("\"", "");
                newList[i] = strFixed;
            }
            statement.setObject(1, id);
            statement.setBytes(2, decode);
            statement.setString(3, name);
            statement.setString(4, description);
            Array arrayFeatures = conn.createArrayOf("text", newList);
            statement.setArray(5, arrayFeatures);
            statement.setDate(6, new java.sql.Date(date.getTime()));
            statement.setDouble(7, price);

            statement.executeUpdate();
            log.info("Added {} at {}.", name, new Date());
        } catch (DataAccessException accessException) {
            success = false;
            log.warn("Failed to add new product at {}.", accessException.getMessage());
        }

        return success;
    }

    public boolean updateProduct(HashMap<String, String> updateProduct) throws SQLException {
        String sql = "UPDATE products SET image = ?, name = ?, description = ?, features = ?, price = ? WHERE product_id = ?";
        boolean success = true;
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/WildFire", "postgres", "adminpassword");

        try {
            PreparedStatement statement = conn.prepareStatement(sql);
            UUID id = UUID.fromString(updateProduct.get("id"));
            byte[] image = Base64.getDecoder().decode(updateProduct.get("image"));
            String name = updateProduct.get("name");
            String description = updateProduct.get("description");
            String list = updateProduct.get("features");
            list = list.replace("[[", "");
            list = list.replace("]]", "");
            String[] listFeatures = list.split(",");
            String[] newList = new String[listFeatures.length];
            for (int i = 0; i < listFeatures.length; i++) {
                String strFixed = listFeatures[i].replace("\"", "");
                newList[i] = strFixed;
            }
            double price = Double.parseDouble(updateProduct.get("price"));
            statement.setBytes(1, image);
            statement.setString(2, name);
            statement.setString(3, description);
            Array array = conn.createArrayOf("text", newList);
            statement.setArray(4, array);
            statement.setDouble(5, price);
            statement.setObject(6, id);
            statement.executeUpdate();
            log.info("Updated {} at {}.", name, new Date());
        } catch (DataAccessException accessException) {
            success = false;
            log.warn("Failed to update product at {}. {}.", new Date(), accessException.getMessage());
        } catch (NullPointerException nullPointerException) {
            success = false;
            log.warn(nullPointerException.getMessage());
        }

        return success;
    }

    public boolean deleteProduct(UUID id) {
        String sql = "DELETE FROM products WHERE product_id = ?";
        boolean success = true;

        try {
            jdbcTemplate.update(sql, id);
            log.info("Deleted product ({}) at {}.", id, new Date());
        } catch (DataAccessException accessException) {
            success = false;
            log.info("Failed to delete product ({}) at {}.", id, new Date());
        }

        return success;
    }
}
