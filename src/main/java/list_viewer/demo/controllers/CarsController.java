package list_viewer.demo.controllers;

import list_viewer.demo.domain.Car;
import list_viewer.demo.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cars")
public class CarsController {

    private final CarService carService;
    @Autowired
    public CarsController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    public List<Car> list (){
        return carService.getAll();
    }

    @GetMapping("{id}")
    public Car getOne(@PathVariable("id") Car car){
        return car;
    }
    @PostMapping
    public Car add(@RequestBody Car car){
        return carService.create(car);
    }
    @PutMapping("{id}")
    public Car update(
            @PathVariable("id") Car carFromDB,
            @RequestBody Car car
    ){
        return carService.update(car,carFromDB);
    }
    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Car car){
        carService.delete(car);
    }

}
