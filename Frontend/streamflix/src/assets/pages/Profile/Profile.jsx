import { Link } from 'react-router-dom';
import avatar from '../../images/poster.jpg';
import styles from './Profile.module.scss';

export default function Profile() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link className={styles.logo} to="/">
                    STREAMFLIX
                </Link>
            </header>

            <main className={styles.main}>
                <section className={styles.card} aria-labelledby="profile-title">
                    <h1 className={styles.title} id="profile-title">
                        My profile
                    </h1>

                    <p className={styles.description}>
                        Your profile and connected account.
                    </p>

                    <div className={styles.avatarRow}>
                        <img
                            className={styles.avatar}
                            src={avatar}
                            alt="Profile avatar"
                        />

                        <button className={styles.changeImageButton} type="button">
                            Change picture
                        </button>
                    </div>

                    <dl className={styles.details}>
                        <div className={styles.detail}>
                            <dt className={styles.label}>Age</dt>
                            <dd className={styles.value}>21</dd>
                        </div>

                        <div className={styles.detail}>
                            <dt className={styles.label}>Account email</dt>
                            <dd className={styles.value}>name@example.com</dd>
                        </div>
                    </dl>

                    <button className={styles.switchButton} type="button">
                        Switch profile
                    </button>
                    <section className={styles.preferences} aria-labelledby="preferences-title">
                        <h2 className={styles.preferencesTitle} id="preferences-title">
                            Preferences
                        </h2>

                        <div className={styles.preferenceGroup}>
                            <h3 className={styles.preferenceLabel}>Movies</h3>

                            <ul className={styles.tags}>
                                <li className={styles.tag}>Interstellar</li>
                                <li className={styles.tag}>Inception</li>
                                <li className={styles.tag}>The Dark Knight</li>
                            </ul>
                        </div>

                        <div className={styles.preferenceGroup}>
                            <h3 className={styles.preferenceLabel}>Genres</h3>

                            <ul className={styles.tags}>
                                <li className={styles.tag}>Sci-Fi</li>
                                <li className={styles.tag}>Thriller</li>
                                <li className={styles.tag}>Adventure</li>
                            </ul>
                        </div>

                        <div className={styles.preferenceGroup}>
                            <h3 className={styles.preferenceLabel}>Series</h3>

                            <ul className={styles.tags}>
                                <li className={styles.tag}>Stranger Things</li>
                                <li className={styles.tag}>Dark</li>
                                <li className={styles.tag}>Breaking Bad</li>
                            </ul>
                        </div>
                    </section>
                </section>
            </main>
        </div>
    );
}