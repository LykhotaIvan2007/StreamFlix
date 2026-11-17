import { Link } from 'react-router-dom';
import styles from './FilmCard.module.scss';

export default function FilmCard(props) {
    const{
        id,
        image,
        title,
        genre
    }=props;
    return (
        <Link className={styles.card} to={`/film/${id}`}>
            <div className={styles.imageWrapper}>
                <img
                    className={styles.image}
                    src={image}
                    alt={`Poster for ${title}`}
                    loading="lazy"
                />
            </div>

            <h2 className={styles.title}>{title}</h2>
            <p className={styles.genre}>{genre}</p>
        </Link>
    );
}