package com.example.streamflix;

import org.springframework.stereotype.Service;

@Service
public class FilmMapper {

    public Film toDomain(
            FilmEntity filmEntity
    ){
        return new Film(
                filmEntity.getId(),
                filmEntity.getName(),
                filmEntity.getDescription(),
                filmEntity.getMinAge(),
                filmEntity.getGenre()
        );
    }

    public FilmEntity toEntity(
            Film film
    ){
        return new FilmEntity(
                film.id(),
                film.name(),
                film.description(),
                film.minAge(),
                film.genre()
        );
    }
}
