import { Link } from "react-router-dom";
import styles from "./ActivateAccount.module.scss";

export default function ActivateAccount() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <p className={styles.logo}>
                    STREAMFLIX
                </p>
            </header>

            <main className={styles.main}>
                <section
                    className={styles.card}
                    aria-labelledby="activation-title"
                >
                    <span className={styles.eyebrow}>
                        ONE LAST STEP
                    </span>

                    <h1 id="activation-title" className={styles.title}>
                        Activate your account
                    </h1>

                    <p className={styles.description}>
                        Ready to join StreamFlix? Click the button below
                        to confirm your email address and activate your account.
                    </p>

                    <button
                        type="button"
                        className={styles.activateButton}
                    >
                        Activate
                    </button>

                    <p className={styles.note}>
                        If you didn’t create a StreamFlix account,
                        you can safely close this page.
                    </p>
                </section>
            </main>
        </div>
    );
}