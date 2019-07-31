package com.example.demo.controllers;

import com.example.demo.domain.Car;
import com.example.demo.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("filter")
public class FindController {
    private final CarService carService;
    @Autowired
    public FindController(CarService carService) {
        this.carService = carService;
    }
    @GetMapping
    public List<Car> findCars(){
        return carService.getAll();
    }

    @GetMapping("{description}")
    public List<Car> findCars(@PathVariable(value = "description" ) String description){
        return carService.findCarsByDescription(description);
    }
}
