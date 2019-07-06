package list_viewer.demo.service.impl;

import list_viewer.demo.domain.Car;
import list_viewer.demo.repo.CarRepository;
import list_viewer.demo.service.CarService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.EntityGraph;
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
    @EntityGraph(attributePaths = "owner")
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
}
