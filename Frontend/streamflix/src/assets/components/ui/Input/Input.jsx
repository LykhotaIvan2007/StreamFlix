import styles from './Input.module.scss';

export default function Input({
                                  id,
                                  label,
                                  type = 'text',
                                  placeholder,
                                  autoComplete,
                              }) {
    return (
        <div className={styles.field}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>

            <input
                className={styles.input}
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
        </div>
    );
}