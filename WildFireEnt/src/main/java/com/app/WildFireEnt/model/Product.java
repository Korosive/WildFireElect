package com.app.WildFireEnt.model;

import javax.persistence.*;
import java.sql.Array;
import java.sql.SQLException;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "products", schema = "public")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID product_id;

    @Column(name = "image")
    private byte[] image;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "features")
    @ElementCollection
    @OrderColumn
    private String[] features;

    @Column(name = "addDate")
    private Date addDate;

    @Column(name = "price")
    private double price;

    public Product() {
    }

    public Product(UUID product_id, byte[] image, String name, String description, String[] features, Date addDate, double price) {
        this.product_id = product_id;
        this.image = image;
        this.name = name;
        this.description = description;
        this.features = features;
        this.addDate = addDate;
        this.price = price;
    }

    public Product(byte[] image, String name, String description, String[] features, Date addDate, double price) {
        this.image = image;
        this.name = name;
        this.description = description;
        this.features = features;
        this.addDate = addDate;
        this.price = price;
    }

    public Product(UUID product_id, byte[] image, String name, String description, Array features, Date addDate, double price) throws SQLException {
        this.product_id = product_id;
        this.image = image;
        this.name = name;
        this.description = description;
        this.features = (String[]) features.getArray();
        this.addDate = addDate;
        this.price = price;
    }


    public UUID getProductID() {
        return product_id;
    }

    public byte[] getImage() {
        return image;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String[] getFeatures() {
        return features;
    }

    public double getPrice() {
        return price;
    }

    public Date getAddDate() {
        return addDate;
    }
}
