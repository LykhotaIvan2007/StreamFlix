import { Link } from "react-router-dom";
import styles from "./ChangePassword.module.scss";

export default function ChangePassword() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <p  className={styles.logo}>
                    STREAMFLIX
                </p>

            </header>

            <main className={styles.main}>
                <section
                    className={styles.card}
                    aria-labelledby="change-password-title"
                >
                    <div className={styles.heading}>
                        <span className={styles.eyebrow}>
                            ACCOUNT SECURITY
                        </span>

                        <h1 id="change-password-title">
                            Change your password
                        </h1>
                    </div>

                    <form className={styles.form}>

                        <div className={styles.field}>
                            <label htmlFor="new-password">
                                New password
                            </label>

                            <input
                                id="new-password"
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Enter your new password"
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="confirm-password">
                                Confirm new password
                            </label>

                            <input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Re-enter your new password"
                            />
                        </div>

                        <div className={styles.actions}>
                            <button
                                type="button"
                                className={styles.saveButton}
                            >
                                Change password
                            </button>

                            <Link
                                to="/profile"
                                className={styles.cancelLink}
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}