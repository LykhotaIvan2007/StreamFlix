import { Link } from 'react-router-dom';
import FilmCard from '../../components/FilmCard/FilmCard';
import poster from '../../images/poster.jpg';
import styles from './Home.module.scss';
import {useEffect, useState} from "react";

export default function Home() {
    const [films, setFilms] = useState([]);

    const getFilms = async ()=>{
        try{
            const response = await fetch(
                "http://localhost:8080/film",
            );

            if (!response.ok) {
                throw new Error("Failed to load films.");
            }

            const data = await response.json();
            setFilms(data)
        }catch (e){
            console.log(e)
        }

    }

    useEffect(() => {
        getFilms()
    }, []);
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link className={styles.logo} to="/" aria-label="StreamFlix home">
                    STREAMFLIX
                </Link>

                <div className={styles.searchArea}>
                    <div className={styles.searchField} role="search">
                        <svg
                            className={styles.searchIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            aria-hidden="true"
                        >
                            <circle cx="10.5" cy="10.5" r="6.5" />
                            <path d="m16 16 4.5 4.5" />
                        </svg>

                        <input
                            className={styles.searchInput}
                            type="search"
                            placeholder="Search movies..."
                            aria-label="Search movies"
                        />
                    </div>

                    <button className={styles.filtersButton} type="button">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            aria-hidden="true"
                        >
                            <path d="M4 7h16M4 17h16" />
                            <circle cx="9" cy="7" r="2" />
                            <circle cx="15" cy="17" r="2" />
                        </svg>

                        Filters
                    </button>
                </div>

                <Link
                    className={styles.profileLink}
                    to="/profile"
                    aria-label="Go to profile"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="8" r="3.5" />
                        <path d="M5 20v-1a7 7 0 0 1 14 0v1" />
                    </svg>
                </Link>
            </header>

            <main className={styles.main}>
                <h1 className={styles.heading}>All movies</h1>

                <div className={styles.grid}>
                    {films.map((film) => (
                        <FilmCard
                            key={film.id}
                            id={film.id}
                            image={poster}
                            title={film.name}
                            genre={film.genre}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}