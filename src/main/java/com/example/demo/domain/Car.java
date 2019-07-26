package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(columnDefinition = "varchar(25)")
    private Long id;
    @Column(name="carModel")
    private String model;
    private int mileage;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy")
    private Date yearOfIssue;
    private String owner;
    @Column(name="clientPhone")
    private String phone;
    @Column(name="clientAddress")
    private String address;
    @Column(name="masterName")
    private String master;
    @Column(name = "aboutCar", columnDefinition = "varchar(300)")
    private String description;

    public Long getId() {
        return id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getMileage() {
        return mileage;
    }

    public void setMileage(int mileage) {
        this.mileage = mileage;
    }

    public Date getYearOfIssue() {
        return yearOfIssue;
    }

    public void setYearOfIssue(Date yearOfIssue) {
        this.yearOfIssue = yearOfIssue;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMaster() {
        return master;
    }

    public void setMaster(String master) {
        this.master = master;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Car() {
    }
}