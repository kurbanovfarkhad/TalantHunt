package com.example.demo.services;

import com.example.demo.domain.Car;

import java.util.List;

public interface CarService {
    List<Car> getAll();
    Car create(Car car);
    void delete(Car car);
    Car update(Car car, Car carFromDB);
}