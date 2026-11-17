# 🎬 StreamFlix — Backend

The backend API for the StreamFlix university project.

This application manages film data and provides REST endpoints used by the React frontend. It is built with Spring Boot and stores data in PostgreSQL.

> **Project status:** Active development. The current implementation supports creating films, retrieving the film catalogue, and retrieving individual films.

---

## 📑 Contents

- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Application Architecture](#application-architecture)
- [Film Data Model](#film-data-model)
- [API Reference](#api-reference)
- [Validation](#validation)
- [Error Handling](#error-handling)
- [Frontend Integration](#frontend-integration)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)

---

## Technology Stack

| Technology | Responsibility |
|---|---|
| **Java** | Application language |
| **Spring Boot** | Application configuration and startup |
| **Spring Web** | REST controllers and HTTP responses |
| **Spring Data JPA** | Repository operations |
| **Hibernate** | Maps Java entities to database tables |
| **Jakarta Validation** | Validates incoming film data |
| **PostgreSQL 17** | Stores application data |
| **Docker Compose** | Runs the local database |
| **Maven** | Manages dependencies and builds |
| **SLF4J** | Application logging |

---

## Prerequisites

Install the following:

- **IntelliJ IDEA**
- A **JDK matching the Java version configured in `pom.xml`**
- **Docker Desktop**, or Docker Engine with Docker Compose
- **Git**

Start Docker before running database commands.

Check Docker availability:

```bash
docker --version
docker compose version
```

PostgreSQL does not need to be installed directly on your computer. Docker runs it in a container.

---

## Initial Setup

### 1. Open the backend project

Open the backend directory containing `pom.xml` in IntelliJ IDEA.

Allow IntelliJ to import the Maven project and download its dependencies.

### 2. Configure Maven in IntelliJ IDEA

For the initial project setup, select **Maven 3** as the Maven home.

Open:

**Settings → Build, Execution, Deployment → Build Tools → Maven**

On macOS, open Settings from the IntelliJ IDEA application menu.

Then:

1. Find **Maven home path**.
2. Select the available **Maven 3** option, such as **Bundled (Maven 3)**.
3. Apply the changes.
4. Reload the Maven project from the Maven tool window.

If Maven 3 is not available as a bundled option, select the directory of a local Maven 3 installation.

Also check that the project's JDK matches the version required by `pom.xml`.

### 3. Create the environment file

The repository includes `.env.example`.

Create a copy named `.env` in the backend root directory, alongside `pom.xml` and `compose.yaml`:

```bash
cp .env.example .env
```

Alternatively, duplicate the file through your editor and rename the copy.

Fill in the values in `.env`:

```dotenv
POSTGRES_DB=streamflix
POSTGRES_USER=streamflix_user
POSTGRES_PASSWORD=replace_with_your_local_password
POSTGRES_PORT=5433
```

| Variable | Purpose |
|---|---|
| `POSTGRES_DB` | Database created during initial PostgreSQL setup |
| `POSTGRES_USER` | PostgreSQL username |
| `POSTGRES_PASSWORD` | Password for that database user |
| `POSTGRES_PORT` | Port exposed on your computer |

Replace the example password with your own local development password.

> Keep `.env` local and excluded from Git. Use `.env.example` to document required variables without sharing credentials.

---

## Database Setup

### Docker Compose configuration

The database service is defined in `compose.yaml`:

```yaml
services:
  postgres:
    image: postgres:17
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "127.0.0.1:${POSTGRES_PORT}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Start PostgreSQL

Run this command from the directory containing `compose.yaml` and `.env`:

```bash
docker compose up -d
```

On the first run, Docker downloads the PostgreSQL image and initialises the database.

The `-d` option runs the container in the background.

Check the service:

```bash
docker compose ps
```

View database logs:

```bash
docker compose logs postgres
```

### Understanding database ports

With `POSTGRES_PORT=5433`:

| Connection location | Host | Port |
|---|---|---|
| Spring Boot running on your computer | `localhost` | `5433` |
| PostgreSQL inside its container | Container-local service | `5432` |

The mapping exposes container port `5432` as port `5433` on your computer.

The `127.0.0.1` binding limits the exposed port to local connections.

### Data persistence

The named volume `postgres_data` stores database files independently of the container.

Stopping or recreating the container does not normally remove the stored data.

To stop the services:

```bash
docker compose down
```

> Do not add `-v` unless you intentionally want to delete the database volume and its data.

PostgreSQL uses `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` when initialising an empty data directory. Changing these values in `.env` does not automatically modify an existing database or its users.

### Optional: connect through IntelliJ IDEA

If your IntelliJ installation provides database tools, add a PostgreSQL data source using:

| Setting | Value |
|---|---|
| Host | `localhost` |
| Port | Value of `POSTGRES_PORT` |
| Database | Value of `POSTGRES_DB` |
| User | Value of `POSTGRES_USER` |
| Password | Value of `POSTGRES_PASSWORD` |

Use **Test Connection** to verify the settings.

---

## Running the Application

### Database configuration

The project uses the following database settings in `application.properties`:

```properties
spring.application.name=streamflix

spring.config.import=optional:file:.env[.properties]

spring.datasource.url=jdbc:postgresql://localhost:${POSTGRES_PORT}/${POSTGRES_DB}
spring.datasource.username=${POSTGRES_USER}
spring.datasource.password=${POSTGRES_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

The import allows Spring Boot to read `.env` as a properties file.

Because the path is relative, run the application with the backend root directory as its working directory.

| Property | Behaviour |
|---|---|
| `spring.config.import` | Loads local environment values |
| `spring.datasource.url` | Specifies the PostgreSQL connection |
| `spring.datasource.username` | Sets the database user |
| `spring.datasource.password` | Sets the database password |
| `spring.jpa.hibernate.ddl-auto=update` | Allows Hibernate to update the schema based on entities |
| `spring.jpa.show-sql=true` | Prints generated SQL during development |

Schema updates are useful during local development. They are not a substitute for a controlled database migration process.

### Startup sequence

1. Start Docker.
2. Start PostgreSQL with `docker compose up -d`.
3. Open the Spring Boot application class in IntelliJ.
4. Run its `main` method.
5. Check the console for successful startup.

The expected API address is:

```text
http://localhost:8080
```

Test the catalogue endpoint:

```bash
curl -i http://localhost:8080/film
```

An empty database should return:

```json
[]
```

---

## Application Architecture

All supplied application classes use the package:

```java
package com.example.streamflix;
```

### Class responsibilities

| Class | Responsibility |
|---|---|
| `ExampleController` | Receives film HTTP requests and returns responses |
| `ExampleService` | Coordinates film operations |
| `ExampleRepository` | Reads and writes film entities |
| `FilmEntity` | Maps film data to the `films` database table |
| `Film` | Immutable record used for film input and output |
| `FilmMapper` | Converts between `Film` and `FilmEntity` |
| `GlobalExceptionHandler` | Converts selected exceptions into HTTP error responses |
| `ErrorResponseDto` | Defines the custom error response structure |

The `Example*` names are the current class names used by the project.

### Dependency injection

Classes receive their dependencies through constructors.

For example:

```java
public ExampleService(
        ExampleRepository repository,
        FilmMapper mapper
) {
    this.repository = repository;
    this.mapper = mapper;
}
```

Spring creates and supplies these objects. Application code does not need to instantiate the service's dependencies manually.

### Repository

```java
public interface ExampleRepository
        extends JpaRepository<FilmEntity, Long> {
}
```

The generic parameters identify:

- `FilmEntity`: the entity managed by the repository.
- `Long`: its identifier type.

Spring Data JPA provides operations such as:

```java
repository.findAll();
repository.findById(id);
repository.save(filmEntity);
```

No repository implementation class is required for these inherited methods.

### Mapper

The mapper separates the API-facing record from the persistence entity:

```java
mapper.toDomain(filmEntity);
mapper.toEntity(film);
```

`toDomain` creates a `Film` from a `FilmEntity`.

`toEntity` creates a `FilmEntity` from a `Film`.

### Example: retrieving a film

1. The client sends `GET /film/1`.
2. The controller reads the path parameter.
3. The service calls `repository.findById(id)`.
4. The repository retrieves the entity from PostgreSQL.
5. The mapper converts it to a `Film`.
6. The controller returns the film as JSON.

If the repository returns an empty result, the service throws an `EntityNotFoundException`. The global handler converts it into a `404` response.

### Example: creating a film

1. The client sends a JSON body to `POST /film/add`.
2. Spring converts the JSON into a `Film` record.
3. Jakarta Validation checks the record.
4. The controller calls the service.
5. The mapper converts the record to an entity.
6. The repository saves the entity.
7. The controller returns `200 OK` with an empty body.

---

## Film Data Model

### API record

```java
public record Film(
        @Null Long id,
        @NotNull @NotBlank String name,
        @NotNull @NotBlank String description,
        @NotNull @NotBlank String minAge,
        @NotNull @NotBlank String genre
) {
}
```

A Java record provides accessors such as `film.name()` and `film.genre()`.

### Database mapping

`FilmEntity` maps to the `films` table:

| Java / JSON property | Database column | Java type |
|---|---|---|
| `id` | `id` | `Long` |
| `name` | `name` | `String` |
| `description` | `description` | `String` |
| `minAge` | `min_age` | `String` |
| `genre` | `genre` | `String` |

The identifier is generated using:

```java
@GeneratedValue(strategy = GenerationType.IDENTITY)
```

Do not supply an identifier when creating a film.

> Use `minAge` in API requests. `min_age` is the database column name.

Poster files, video files, release year, and duration are not part of the current entity.

---

## API Reference

### Overview

| Method | Endpoint | Successful response |
|---|---|---|
| `GET` | `/film` | `200 OK` with an array |
| `GET` | `/film/{id}` | `200 OK` with one film |
| `POST` | `/film/add` | `200 OK` with no response body |

### Get all films

```http
GET /film
```

Example:

```bash
curl -i http://localhost:8080/film
```

Example response:

```json
[
  {
    "id": 1,
    "name": "Interstellar",
    "description": "A team travels through space to find a new home for humanity.",
    "minAge": "12",
    "genre": "Science Fiction"
  }
]
```

An empty catalogue returns an empty array.

### Get a film by ID

```http
GET /film/{id}
```

Example:

```bash
curl -i http://localhost:8080/film/1
```

Returns a film when found, or `404 Not Found` when no film exists with the requested ID.

### Create a film

```http
POST /film/add
Content-Type: application/json
```

Request body:

```json
{
  "name": "Interstellar",
  "description": "A team travels through space to find a new home for humanity.",
  "minAge": "12",
  "genre": "Science Fiction"
}
```

Example:

```bash
curl -i -X POST http://localhost:8080/film/add \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Interstellar",
    "description": "A team travels through space to find a new home for humanity.",
    "minAge": "12",
    "genre": "Science Fiction"
  }'
```

Successful response:

```http
HTTP/1.1 200 OK
```

The current implementation returns no body and does not return the generated identifier.

> Frontend code should not call `response.json()` on this successful response.

---

## Validation

The controller uses:

```java
@RequestBody @Valid Film film
```

`@RequestBody` reads the incoming JSON. `@Valid` triggers validation of the resulting record.

| Field | Requirement |
|---|---|
| `id` | Must be omitted or `null` |
| `name` | Must contain non-whitespace text |
| `description` | Must contain non-whitespace text |
| `minAge` | Must contain non-whitespace text |
| `genre` | Must contain non-whitespace text |

`@NotBlank` already rejects `null`, empty strings, and whitespace-only strings. The current record also declares `@NotNull`.

### Current validation limits

- `minAge` is a string; no numeric range is currently enforced.
- `genre` is free text; no fixed list is enforced.
- No explicit string-length constraints are declared.
- No duplicate-title validation is implemented in the supplied service.

The `@Null` constraint applies when the incoming record is validated. It does not prevent returned films from containing generated identifiers.

---

## Error Handling

`GlobalExceptionHandler` handles the following exceptions:

| Exception | HTTP status | Message |
|---|---|---|
| `EntityNotFoundException` | `404 Not Found` | `Entity not found` |
| `IllegalArgumentException` | `400 Bad Request` | `Bad request` |
| `IllegalStateException` | `400 Bad Request` | `Bad request` |

These responses use:

```java
public record ErrorResponseDto(
        String message,
        String detailedMessage,
        LocalDateTime errorTime
) {
}
```

Example response for a missing film:

```json
{
  "message": "Entity not found",
  "detailedMessage": "Not found reservation by id 999",
  "errorTime": "2026-11-17T16:30:00"
}
```

The timestamp above is illustrative.

> The current missing-film exception says “reservation”. This is a wording issue in `ExampleService`; the operation still searches for a film.

Request validation failures are not explicitly handled by the supplied global handler. They normally produce `400 Bad Request`, but their response body should not be assumed to match `ErrorResponseDto`.

Unhandled failures may also use Spring's default error response structure.

---

## Frontend Integration

The film controller allows the development frontend origin:

```java
@CrossOrigin(origins = "http://localhost:5173")
```

| Application | Development address |
|---|---|
| React frontend | `http://localhost:5173` |
| Spring Boot backend | `http://localhost:8080` |

If the frontend runs on another port or hostname, review the CORS configuration and restart the backend after changing it.

CORS controls browser cross-origin access. It does not provide authentication or authorisation.

Authentication, account management, profile management, film updates, and film deletion are not implemented in the classes documented here.

---

## Development Workflow

When changing film functionality:

1. Review the controller endpoint and request format.
2. Update the service operation where necessary.
3. Update the entity if database fields change.
4. Update the `Film` record and mapper to match.
5. Review validation rules.
6. Start the database and application.
7. Test both successful and unsuccessful requests.
8. Coordinate any API changes with the frontend.

### Manual verification

Useful checks include:

- Retrieve an empty or populated catalogue.
- Create a film with valid data.
- Retrieve the created film.
- Request an ID that does not exist.
- Submit an empty required field.
- Submit a non-null ID when creating a film.

Check HTTP statuses and response bodies, not only console messages.

---

## Troubleshooting

| Problem | What to check |
|---|---|
| Maven import or build fails | Select Maven 3 in IntelliJ and reload the Maven project |
| Java compilation fails | Verify the JDK against `pom.xml` |
| Docker command cannot connect | Start Docker Desktop or the Docker service |
| Environment variables cannot be resolved | Check `.env`, variable names, and the application's working directory |
| Database connection refused | Check `docker compose ps`, database logs, and the configured port |
| Database authentication fails | Check credentials and whether the volume was initialised with older values |
| Host port is already in use | Choose an available `POSTGRES_PORT` and recreate the database container |
| Browser reports CORS errors | Check the actual frontend origin against the controller configuration |
| Creating a film returns `400` | Check required fields and ensure `id` is omitted or `null` |
| Film lookup returns `404` | Confirm that the requested film ID exists |
| Frontend reports a JSON parsing error after creation | The successful POST response is empty |
| Database write fails | Inspect backend logs for SQL errors and schema constraints |

### Useful database commands

Start PostgreSQL:

```bash
docker compose up -d
```

Check its status:

```bash
docker compose ps
```

Follow database logs:

```bash
docker compose logs -f postgres
```

Stop the services while retaining the named volume:

```bash
docker compose down
```