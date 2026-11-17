import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input/Input';
import styles from './CreateProfile.module.scss';

export default function CreateProfile() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <p className={styles.logo}>
                    STREAMFLIX
                </p>
            </header>

            <main className={styles.main}>
                <section className={styles.card} aria-labelledby="create-profile-title">
                    <h1 className={styles.title} id="create-profile-title">
                        Create a profile
                    </h1>

                    <p className={styles.description}>
                        Add a personal profile for yourself or a family member.
                    </p>

                    <form className={styles.form}>
                        <div className={styles.pictureRow}>
                            <div className={styles.avatar} aria-hidden="true">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                >
                                    <circle cx="12" cy="8" r="3.5" />
                                    <path d="M5 20v-1a7 7 0 0 1 14 0v1" />
                                </svg>
                            </div>

                            <div className={styles.pictureDetails}>
                                <button className={styles.pictureButton} type="button">
                                    Add picture
                                </button>

                                <span className={styles.optionalText}>
                  Optional — you can add it later.
                </span>
                            </div>
                        </div>

                        <Input
                            id="accountEmail"
                            label="Account email"
                            placeholder="Enter an account profile"
                            autoComplete="email"
                        />

                        <Input
                            id="profileName"
                            label="Profile name"
                            placeholder="Enter a profile name"
                            autoComplete="off"
                        />

                        <div className={styles.ageField}>
                            <label className={styles.label} htmlFor="profileAge">
                                Age
                            </label>

                            <input
                                className={styles.ageInput}
                                id="profileAge"
                                name="age"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Enter age"
                                aria-describedby="age-hint"
                            />

                            <p className={styles.hint} id="age-hint">
                                Age is used to determine which movies and series this
                                profile can see.
                            </p>
                        </div>

                        <button className={styles.createButton} type="button">
                            Create profile
                        </button>

                        <Link className={styles.cancelLink} to="/profile">
                            Cancel
                        </Link>
                    </form>
                </section>
            </main>
        </div>
    );
}