package com.example.demo.services.impl;

import com.example.demo.domain.Car;
import com.example.demo.repo.CarRepository;
import com.example.demo.services.CarService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;
    @Autowired
    public CarServiceImpl(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public List<Car> getAll() {
        return carRepository.findAll();
    }

    @Override
    public Car create(Car car) {
        return carRepository.save(car);
    }

    @Override
    public void delete(Car car) {
        carRepository.delete(car);
    }

    @Override
    public Car update(Car car, Car carFromDB) {
        BeanUtils.copyProperties(car,carFromDB,"id");
        return carRepository.save(carFromDB);
    }

    @Override
    public List<Car> findCarsByDescription(String description) {
        return carRepository.findAllByDescription(description);
    }
}