package list_viewer.demo;

import list_viewer.demo.domain.Car;
import list_viewer.demo.service.CarService;
import org.junit.Test;

import java.util.Date;

public class ControllerTest {
    Car car = new Car();

    private final CarService carService;

    public ControllerTest(CarService carService) {
        this.carService = carService;
    }

    @Test
    public void servTest(){
        car.setAddress("asdasd");
        car.setDescription("asdasdasd");
        car.setMaster("asdasdasd");
        car.setMileage(12312);
        car.setModel("asdasdas");
        car.setOwner("asdasdas");
        car.setPhone("1231132");
        car.setYearOfIssue(new Date(1994,12,4));
        carService.create(car);
    }
}
