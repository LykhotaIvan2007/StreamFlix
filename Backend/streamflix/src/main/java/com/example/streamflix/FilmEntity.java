package com.example.streamflix;


import jakarta.persistence.*;

@Table(name = "films")
@Entity
public class FilmEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "min_age")
    private String minAge;

    @Column(name = "genre")
    private String genre;

    public FilmEntity(){}

    public FilmEntity(Long id, String name, String description, String minAge, String genre) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.minAge = minAge;
        this.genre = genre;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMinAge() {
        return minAge;
    }

    public void setMinAge(String minAge) {
        this.minAge = minAge;
    }
}
