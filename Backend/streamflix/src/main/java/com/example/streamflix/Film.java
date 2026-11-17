package com.example.streamflix;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

public record Film(
        @Null
        Long id,
        @NotNull
        @NotBlank
        String name,
        @NotNull
        @NotBlank
        String description,
        @NotNull
        @NotBlank
        String minAge,
        @NotNull
        @NotBlank
        String genre
) {
}
