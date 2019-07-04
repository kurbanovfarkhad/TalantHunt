package list_viewer.demo.service;

import list_viewer.demo.domain.Car;

import java.util.List;

public interface CarService {
    List<Car> getAll();
    Car create(Car car);
    void delete(Car car);
    Car update(Car car, Car carFromDB);
}
