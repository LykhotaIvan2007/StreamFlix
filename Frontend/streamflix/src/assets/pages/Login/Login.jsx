import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input/Input';
import styles from './Login.module.scss';

export default function Login() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <p className={styles.logo}>
                    STREAMFLIX
                </p>
            </header>

            <main className={styles.main}>
                <section className={styles.card} aria-labelledby="login-title">
                    <h1 className={styles.title} id="login-title">
                        Sign in
                    </h1>

                    <p className={styles.description}>
                        Welcome back. Your next story awaits.
                    </p>

                    <form className={styles.form}>

                        <Input
                            id="profile"
                            label="Profile name"
                            type="text"
                            placeholder="profile name"
                        />

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
                            autoComplete="current-password"
                        />

                        <Link className={styles.forgotPassword} to="/change-password">
                            Forgot password?
                        </Link>

                        <button className={styles.submitButton} type="button">
                            Sign in
                        </button>
                    </form>

                    <p className={styles.registerText}>
                        New to StreamFlix?{' '}
                        <Link className={styles.registerLink} to="/register">
                            Create an account
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