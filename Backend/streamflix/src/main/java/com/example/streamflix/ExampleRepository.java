package com.example.streamflix;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExampleRepository extends JpaRepository<FilmEntity, Long> {

}
