package com.example.streamflix;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExampleService {

    private final ExampleRepository repository;
    private final FilmMapper mapper;

    public ExampleService(ExampleRepository repository, FilmMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<Film> getAllFilms(){
        List<FilmEntity> filmEntities = repository.findAll();
        List<Film> films = new ArrayList<>();
        for (FilmEntity filmEntity: filmEntities){
            films.add(mapper.toDomain(filmEntity));
        }

        return films;
    }

    public void addFilm(
            Film film
    ){
        FilmEntity filmEntity = mapper.toEntity(film);
        repository.save(filmEntity);
    }

    public Film getFilmById(
            Long id
    ){
        FilmEntity filmEntity = repository.findById(id).orElseThrow(
                ()-> new EntityNotFoundException("Not found reservation by id "+id)
        );
        return mapper.toDomain(filmEntity);
    }
}
