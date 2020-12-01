package com.app.WildFireEnt.controller;

import com.app.WildFireEnt.model.Product;
import com.app.WildFireEnt.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;
    private final Logger log = LoggerFactory.getLogger(ProductController.class);

    @GetMapping(value = "/get/{id}", produces = "application/json")
    public Product getPost(@PathVariable UUID id) {
        return productService.getProduct(id);
    }

    @GetMapping(value = "/get/list", produces = "application/json")
    public List<Product> getList() {
        return productService.getList();
    }

    @PostMapping(value = "/add", consumes = "application/json", produces = "application/json")
    public HashMap<String, Boolean> addProduct(@RequestBody HashMap<String, String> newProduct) throws SQLException {
        HashMap<String, Boolean> response = new HashMap<>();
        boolean success = productService.addProduct(newProduct);
        response.put("add", success);
        return response;
    }

    @PutMapping(value = "/update", consumes = "application/json", produces = "application/json")
    public HashMap<String, Boolean> updateProduct(@RequestBody HashMap<String, String> updateProduct) {
        HashMap<String, Boolean> response = new HashMap<>();
        boolean success = productService.updateProduct(updateProduct);
        response.put("update", success);
        return response;
    }

    @DeleteMapping(value = "/delete/{id}", produces = "application/json")
    public HashMap<String, Boolean> deleteProduct(@PathVariable UUID id) {
        HashMap<String, Boolean> response = new HashMap<>();
        boolean success = productService.deleteProduct(id);
        response.put("delete", success);
        return response;
    }
}
