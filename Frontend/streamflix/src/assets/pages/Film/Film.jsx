import { Link, useParams } from 'react-router-dom';
import styles from './Film.module.scss';
import poster from '../../images/poster.jpg';
import scene from '../../images/scene.png';
import {useEffect, useState} from "react";

export default function Film() {

    const { id } = useParams();

    const [film, setFilm] = useState({})

    const getFilmById = async()=>{
        try{
            const response = await fetch(`http://localhost:8080/film/${id}`)

            if (!response.ok){
                throw new Error("can not find film by id")
            }

            const data = await response.json();
            setFilm(data)

        }catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        getFilmById()
    }, []);

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link className={styles.logo} to="/">
                    STREAMFLIX
                </Link>
            </header>

            <main className={styles.main}>
                <section className={styles.filmInfo} aria-labelledby="film-title">
                    <img
                        className={styles.poster}
                        src={poster}
                        alt="Beyond the Stars poster"
                    />

                    <div className={styles.details}>
                        <span className={styles.eyebrow}>STREAMFLIX MOVIE</span>

                        <h1 className={styles.title} id="film-title">
                            {film.name}
                        </h1>

                        <div className={styles.metadata}>
              <span className={styles.ageRating} aria-label="Ages 16 and over">
                {film.minAge}+
              </span>

                            <span>2026</span>
                            <span>2h 18m</span>
                            <span>{film.genre}</span>
                        </div>

                        <p className={styles.description}>
                            {film.description}
                        </p>
                    </div>
                </section>

                <section className={styles.player} aria-label="Movie player">
                    <div className={styles.screen}>
                        <img
                            className={styles.scene}
                            src={scene}
                            alt="A scene from Beyond the Stars"
                        />

                        <div className={styles.screenOverlay}>
                            <span className={styles.previewLabel}>PREVIEW</span>

                            <button
                                className={styles.centerPlay}
                                type="button"
                                aria-label="Play movie"
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={styles.controls}>
                        <label className={styles.srOnly} htmlFor="film-progress">
                            Playback position
                        </label>

                        <input
                            className={styles.timeline}
                            id="film-progress"
                            type="range"
                            min="0"
                            max="8280"
                            defaultValue="0"
                        />

                        <div className={styles.controlsRow}>
                            <div className={styles.buttons}>
                                <button
                                    className={styles.controlButton}
                                    type="button"
                                    aria-label="Rewind 10 seconds"
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M11 5 2 12l9 7V5zm11 0-9 7 9 7V5z" />
                                    </svg>
                                    <span>10s</span>
                                </button>

                                <button
                                    className={styles.controlButton}
                                    type="button"
                                    aria-label="Play"
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>

                                <button
                                    className={styles.controlButton}
                                    type="button"
                                    aria-label="Forward 10 seconds"
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="m2 5 9 7-9 7V5zm11 0 9 7-9 7V5z" />
                                    </svg>
                                    <span>10s</span>
                                </button>
                            </div>

                            <div className={styles.timeDisplay} aria-label="Playback time">
                                <span className={styles.currentTime}>00:00:00</span>
                                <span>/</span>
                                <span>02:18:00</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}