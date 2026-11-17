package com.example.streamflix;


import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/film")
@CrossOrigin(origins = "http://localhost:5173")
public class ExampleController {

    private static final Logger log = LoggerFactory.getLogger(ExampleController.class);

    private final ExampleService exampleService;

    public ExampleController(ExampleService exampleService) {
        this.exampleService = exampleService;
    }

    @GetMapping
    public ResponseEntity<List<Film>> getAllFilms(){
        log.info("called getAllFilms");

        return ResponseEntity.status(HttpStatus.OK)
                .body(exampleService.getAllFilms());
    }


    @PostMapping("/add")
    public ResponseEntity<Film> addFilm(
          @RequestBody @Valid Film film
    ){
        log.info("Added film" + film);

        exampleService.addFilm(film);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Film> getFilmById(
            @PathVariable("id") Long id
    ){
        log.info("called getFilmByID: id = "+id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(exampleService.getFilmById(id));
    }
}
