package com.example.demo.repo;

import com.example.demo.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarRepository extends JpaRepository<Car,Long> {
    @Query(value = "select * from car where about_car like %:description%", nativeQuery = true)
    List<Car> findAllByDescription(@Param("description") String description);
}