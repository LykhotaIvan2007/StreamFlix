# 🎬 StreamFlix — Frontend

A React frontend for a university streaming application project.

StreamFlix provides a film catalogue, individual film pages, a film creation form, and interface layouts for accounts and profiles. It communicates with a separate Spring Boot backend through an HTTP API.

> **Project status:** Active development. Film API integration is in progress. Several account, profile, and player screens currently contain interface layouts only.

---

## 📑 Contents

- [Technology Stack](#technology-stack)
- [Current Features](#current-features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [React Fundamentals](#react-fundamentals)
- [Routing and Navigation](#routing-and-navigation)
- [Backend Communication](#backend-communication)
- [Film Creation Form](#film-creation-form)
- [Styling Guidelines](#styling-guidelines)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)

---

## Technology Stack

| Technology | Responsibility |
|---|---|
| **React** | Builds the interface from reusable components |
| **Vite** | Runs the development server and provides build tooling |
| **JavaScript / JSX** | Defines component behaviour and markup |
| **React Router** | Handles navigation between pages |
| **SCSS Modules** | Provides component-scoped styles |
| **CSS custom properties** | Defines shared colours |
| **Fetch API** | Sends requests to the backend |

**Related backend technologies:** Java, Spring Boot, PostgreSQL, and Docker.

The frontend communicates with the backend API. It does not connect directly to PostgreSQL.

---

## Current Features

| Feature | Status |
|---|---|
| Film catalogue | Film data loads from the backend |
| Individual film request | Implemented; check `Film.jsx` for current field bindings |
| Film creation | Form and POST request implemented; persistence requires end-to-end verification |
| Film posters | Shared local placeholder image |
| Search and filtering | Interface only |
| Registration and login | Interface only; authentication integration is not confirmed |
| Profile page | Demonstration data |
| Profile creation | Interface only |
| Profile switching | Not implemented |
| Image upload | Not implemented |
| Video player | Visual mockup without video playback |
| Age-based content restrictions | Not implemented |

> A visible button or form does not necessarily mean that its backend functionality is available.

---

## Getting Started

### 1. Check prerequisites

You need:

- **Node.js and npm**, using a Node.js version compatible with the project's Vite version.
- **Git** for working with the repository.
- The **backend development environment** for testing API features.

Check your installation:

```bash
node --version
npm --version
```

### 2. Install dependencies

Open a terminal in the frontend directory containing `package.json`, then run:

```bash
npm install
```

This installs the dependencies declared in the project.

> If npm cannot find `package.json`, check your current directory. The frontend application may be inside a repository subdirectory.

### 3. Start the frontend

```bash
npm run dev
```

Open the URL printed in the terminal. The expected address is:

```text
http://localhost:5173
```

Keep this process running while developing. Vite updates the browser when source files change.

If the port is occupied, Vite may select another port. Always check the terminal output.

### 4. Start the database and backend

API features also require PostgreSQL and Spring Boot.

From the backend directory containing `compose.yaml`:

```bash
docker compose up -d
```

Then start the Spring Boot application, for example through IntelliJ IDEA.

The expected backend address is:

```text
http://localhost:8080
```

| Service | Expected local address |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:8080` |
| PostgreSQL from the host machine | `localhost:5433` |

Database credentials belong in the backend configuration. Do not place them in frontend source files.

---

## Project Structure

| Location | Purpose |
|---|---|
| `src/main.jsx` | Application entry point and global style import |
| `src/App.jsx` | Application route definitions |
| `src/styles/global.scss` | Global styles and shared colour variables |
| `src/assets/pages/` | Page components |
| `src/assets/components/FilmCard/` | Reusable film card |
| `src/assets/components/ui/Input/` | Shared input component |
| `src/assets/images/` | Local images and placeholders |
| `src/assets/pages/CreateFilm/CreateFilm.jsx` | Film creation page |
| `src/assets/pages/CreateFilm/CreateFilm.module.scss` | Film creation styles |

**Pages** represent complete screens. **Components** represent reusable parts of those screens.

For example, the Home page displays multiple instances of the same `FilmCard` component.

---

## React Fundamentals

This section explains the concepts used throughout the project.

### Components and JSX

A component is a JavaScript function that returns JSX. JSX describes the interface:

```jsx
function PageHeading() {
    return <h1>Film catalogue</h1>;
}
```

Components can be used inside other components:

```jsx
function Home() {
    return (
        <main>
            <PageHeading />
        </main>
    );
}
```

Important conventions:

- Component names start with a capital letter.
- Use `className` instead of HTML's `class`.
- Use `htmlFor` instead of HTML's `for` on labels.
- Place JavaScript expressions inside `{}`.

```jsx
<h1 className={styles.title}>{film.name}</h1>
```

### Props: passing data between components

Props pass information from a parent component to a child component.

For example, Home passes data to a film card:

```jsx
<FilmCard
    key={film.id}
    id={film.id}
    image={poster}
    title={film.name}
    genre={film.genre}
/>
```

The card receives these values through its parameters:

```jsx
function FilmCard({ id, image, title, genre }) {
    // Use these values in the JSX.
}
```

Treat props as read-only.

> `key` is a special React attribute used to identify list items. It is not passed as a normal prop. Pass `id` separately if the component needs it.

### State: storing values that change

State stores information that affects the interface, such as form values or films received from the backend:

```jsx
const [name, setName] = useState("");
```

| Part | Meaning |
|---|---|
| `name` | Value available during the current render |
| `setName` | Function used to update the value |
| `""` | Initial value |

Update state using its setter:

```jsx
setName("Interstellar");
```

React then renders the component again using the updated state.

A render means React calls the component to calculate its interface. It does not reload the entire browser page.

**State updates apply to a subsequent render:**

```jsx
setName("Interstellar");

console.log(name);
// Still reads the value from the current render.
```

Do not update state variables by assigning directly to them.

### Effects: synchronising with external systems

`useEffect` is used for work such as loading data when a page opens:

```jsx
useEffect(() => {
    getFilms();
}, []);
```

The dependency array controls when the effect runs:

| Dependencies | Behaviour |
|---|---|
| `[]` | Runs when the component mounts |
| `[id]` | Runs on mount and when `id` changes |
| No dependency array | Runs after every committed render |

If React Strict Mode is enabled, effects may run an additional time during development checks.

> Call hooks such as `useState` and `useEffect` at the top level of a component or custom hook, not inside loops, conditions, or event handlers.

---

## Routing and Navigation

Routes are defined in `App.jsx` using `BrowserRouter`, `Routes`, and `Route`.

| URL | Page |
|---|---|
| `/` | Home |
| `/register` | Registration |
| `/login` | Login |
| `/film/:id` | Film |
| `/profile` | Profile |
| `/create-profile` | CreateProfile |
| `/create-film` | CreateFilm |

### Internal links

Use `Link` for navigation within the application:

```jsx
<Link to="/create-film">Create film</Link>
```

React Router displays the destination page without a full browser reload.

### Dynamic film routes

The `:id` segment represents a variable value.

For example:

```text
/film/5
```

This URL identifies film `5`.

A card creates the link using its ID:

```jsx
<Link to={`/film/${id}`}>{title}</Link>
```

The Film page reads the parameter:

```jsx
const { id } = useParams();
```

URL parameters are strings.

When loading a film based on `id`, the loading effect should respond to changes in that parameter.

---

## Backend Communication

### Available film endpoints

Current development base URL:

```text
http://localhost:8080
```

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/film` | Retrieve all films |
| `GET` | `/film/{id}` | Retrieve one film |
| `POST` | `/film/add` | Create a film |

**Frontend routes and backend endpoints have different responsibilities:**

- `/create-film` opens a page in the frontend.
- `http://localhost:8080/film/add` receives film data on the backend.

### Film data model

| JSON property | Type | Description |
|---|---|---|
| `id` | Number | Identifier generated by the backend |
| `name` | String | Film title |
| `description` | String | Film description |
| `minAge` | String | Minimum viewer age |
| `genre` | String | Film genre |

Use `minAge` in JSON. The database column is named `min_age`.

The model does not currently contain poster or video upload fields. Year and duration displayed in a mockup should not be assumed to come from the API.

### How catalogue loading works

The page starts with an empty list:

```jsx
const [films, setFilms] = useState([]);
```

The loading process is:

1. React displays the page using its initial state.
2. An effect starts the `GET /film` request.
3. The handler checks `response.ok`.
4. `response.json()` reads the response body.
5. `setFilms(data)` stores the returned array.
6. React renders the page with the loaded films.
7. `films.map(...)` creates the cards.

Example rendering:

```jsx
{films.map((film) => (
    <FilmCard
        key={film.id}
        id={film.id}
        image={poster}
        title={film.name}
        genre={film.genre}
    />
))}
```

### Sending JSON with fetch

The second argument to `fetch` contains the request configuration:

```jsx
const response = await fetch("http://localhost:8080/film/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        name,
        description,
        minAge: age,
        genre,
    }),
});
```

| Setting | Purpose |
|---|---|
| `method` | Selects the HTTP method |
| `headers` | Supplies request metadata |
| `Content-Type` | Identifies the body as JSON |
| `body` | Contains the data being sent |
| `JSON.stringify()` | Converts a JavaScript object to a JSON string |

Check the response explicitly:

```jsx
if (!response.ok) {
    throw new Error("Cannot add film");
}
```

`fetch` does not automatically throw an error for HTTP responses such as `400` or `500`.

Only use `response.json()` when the endpoint returns a JSON body. A successful response can have an empty body.

---

## Film Creation Form

### Form state

The page stores each field separately:

```jsx
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [genre, setGenre] = useState("");
const [age, setAge] = useState("");
```

### Controlled inputs

An input is connected to state through `value` and `onChange`:

```jsx
<input
    type="text"
    value={name}
    onChange={(event) => setName(event.target.value)}
/>
```

The process is:

1. The user enters a value.
2. `onChange` receives an event.
3. The setter updates state.
4. React displays the updated value.

This is called a **controlled input**.

### Age input

```jsx
<input
    type="number"
    min="0"
    value={age}
    onChange={(event) => setAge(event.target.value)}
/>
```

Even with `type="number"`, `event.target.value` is a string. This matches the backend's current `String minAge` field.

Use `""` for an empty value rather than `undefined`.

### Clearing the form

After a successful response:

```jsx
setName("");
setDescription("");
setGenre("");
setAge("");
```

The inputs clear because their `value` attributes are connected to state.

### Triggering the request

Creation requests should run in response to a user action, such as a button click or form submission.

When using `onSubmit`, call:

```jsx
event.preventDefault();
```

This prevents the browser's default form navigation.

Avoid triggering the same request through both the form's `onSubmit` and the button's `onClick`.

The current handler logs failures to the browser console. User-facing error messages remain a future improvement.

---

## Styling Guidelines

### Global styles

Shared styles and colours are defined in:

```text
src/styles/global.scss
```

Use the existing variables:

```scss
.card {
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-surface-border);
}
```

Common variables include:

| Variable | Purpose |
|---|---|
| `--color-background` | Page background |
| `--color-text` | Primary text |
| `--color-primary` | Main red accent |
| `--color-primary-hover` | Primary button hover colour |
| `--color-input-background` | Input background |
| `--color-border` | Input and control borders |
| `--color-text-secondary` | Secondary text |

Add new shared colours to `:root` when necessary.

### Component styles

Use `.module.scss` files for component-specific styling:

```jsx
import styles from "./CreateFilm.module.scss";
```

Apply the imported class:

```jsx
<section className={styles.card}>
    {/* Content */}
</section>
```

SCSS Modules scope class names to reduce accidental styling conflicts between components.

### Local images

Import images before using them:

```jsx
import poster from "../../images/poster.jpg";
```

```jsx
<img src={poster} alt="Film poster" />
```

Adjust the relative import path to match the component's location.

### Responsive layouts

Check pages at both desktop and mobile widths.

Forms and grids should adapt without creating horizontal scrolling. Follow the existing media-query patterns.

---

## Development Workflow

### When changing an existing page

1. Read the component and its SCSS Module.
2. Check whether its data is static or loaded from the API.
3. Make the required change.
4. Reuse existing components and colour variables.
5. Test the result in the browser.
6. Check the Console and Network tabs.

### When adding a page

1. Create a page component inside `src/assets/pages/`.
2. Create its `.module.scss` file.
3. Import the component into `App.jsx`.
4. Add its route inside the existing `Routes`.
5. Add a `Link` where users should access the page.
6. Verify desktop and mobile layouts.

### When connecting an API endpoint

1. Confirm the endpoint and HTTP method with the backend implementation.
2. Confirm the request and response field names.
3. Add the necessary state.
4. Send the request from an effect or event handler, depending on its purpose.
5. Check the response status.
6. Update state after success.
7. Test both successful and failed requests.

### Before committing

- Remove temporary debugging code where appropriate.
- Check that imports and routes still work.
- Avoid unrelated changes.
- Keep dependency and lockfile changes together.
- Do not commit credentials or local secret configuration.

---

## Troubleshooting

| Problem | What to check |
|---|---|
| npm cannot find `package.json` | Open the terminal in the frontend application directory |
| Films do not load | Confirm that Spring Boot and PostgreSQL are running |
| Request fails | Inspect its URL, status, and response in the Network tab |
| CORS error | Check that the backend allows the actual frontend origin |
| Input cannot be edited | Ensure `onChange` updates the state used by `value` |
| Input does not clear | Ensure its `value` is connected to the state being reset |
| State appears unchanged in a log | The current function still sees state from its current render |
| Styles do not appear | Check the module import and `className` |
| Film details do not update | Check the route ID and loading effect dependencies |

### CORS

The frontend and backend run on different origins during development:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8080
```

The backend must allow requests from the frontend origin.

Check the current Spring CORS configuration and restart the backend after modifying it.

### Browser developer tools

Use these tabs when investigating problems:

- **Console:** JavaScript errors and logged messages.
- **Network:** Request URLs, HTTP methods, status codes, request bodies, and responses.
- **Elements:** Rendered HTML and applied CSS.

> Start by checking whether the request was sent, what the backend returned, and whether the response was saved to state.