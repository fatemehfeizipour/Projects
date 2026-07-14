import styles from '../styles/Home.module.css';

export default function Card({ title, description, link, external }) {
  return (
    <a
      href={link}
      className={styles.card}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <h3>{title} &rarr;</h3>
      <p>{description}</p>
    </a>
  );
}