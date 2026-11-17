import { Link } from "react-router-dom";
import styles from "./CreateFilm.module.scss";
import {useState} from "react";

export default function CreateFilm() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [genre, setGenre] = useState("")
    const [age, setAge] = useState("")

    const createFilm = async ()=>{
        try{
            const response = await fetch("http://localhost:8080/film/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    minAge: age,
                    genre: genre,
                }),
            });

            if (!response.ok){
                throw new Error("Can not add")
            }
            setName("")
            setDescription("")
            setGenre("")
            setAge("")
        }catch (e){
            console.log(e)
        }
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link to="/" className={styles.logo}>
                    STREAMFLIX
                </Link>

                <Link to="/" className={styles.backLink}>
                    ← Back to catalogue
                </Link>
            </header>

            <main className={styles.main}>
                <section className={styles.card}>
                    <div className={styles.heading}>
                        <span className={styles.eyebrow}>YOUR CATALOGUE</span>
                        <h1>Create film</h1>
                        <p>Add a new film to the StreamFlix catalogue.</p>
                    </div>

                    <form className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="film-name">Film title</label>
                            <input
                                id="film-name"
                                name="name"
                                type="text"
                                placeholder="Enter film title"
                                value={name}
                                onChange={(event)=>setName(event.target.value)}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="film-description">
                                Description
                            </label>
                            <textarea
                                id="film-description"
                                name="description"
                                placeholder="Write a short description of the film"
                                value={description}
                                onChange={(event)=>setDescription(event.target.value)}
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor="film-genre">Genre</label>
                                <input
                                    id="film-genre"
                                    name="genre"
                                    type="text"
                                    placeholder="Enter film genre"
                                    value={genre}
                                    onChange={(event)=>setGenre(event.target.value)}
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="film-min-age">
                                    Minimum age
                                </label>
                                <input
                                    id="film-min-age"
                                    name="minAge"
                                    type="number"
                                    min="0"
                                    placeholder="e.g. 16"
                                    value={age}
                                    onChange={(event)=>setAge(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <Link to="/" className={styles.cancelButton}>
                                Cancel
                            </Link>

                            <button
                                type="button"
                                className={styles.createButton}
                                onClick={createFilm}
                            >
                                Create film
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}