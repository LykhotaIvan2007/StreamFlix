import Input from '../../components/ui/Input/Input.jsx';
import styles from './Registration.module.scss';
import {Link} from "react-router-dom";

export default function Registration() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <p className={styles.logo}>
                    STREAMFLIX
                </p>
            </header>

            <main className={styles.main}>
                <section className={styles.card} aria-labelledby="registration-title">
                    <h1 className={styles.title} id="registration-title">
                        Create an account
                    </h1>

                    <p className={styles.description}>
                        Your next favourite story starts here.
                    </p>

                    <form className={styles.form}>
                        <Input
                            id="email"
                            label="Email address"
                            type="email"
                            placeholder="name@example.com"
                            autoComplete="email"
                        />

                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="new-password"
                        />

                        <Input
                            id="confirmPassword"
                            label="Confirm password"
                            type="password"
                            placeholder="Repeat your password"
                            autoComplete="new-password"
                        />

                        <button className={styles.submitButton} type="button">
                            Create account
                        </button>
                    </form>

                    <p className={styles.signInText}>
                        Already have an account?{' '}
                        <Link className={styles.signInLink} to="/login">
                            Sing in
                        </Link>
                    </p>
                </section>
            </main>

            <footer className={styles.footer}>
                StreamFlix — Your next story awaits.
            </footer>
        </div>
    );
}