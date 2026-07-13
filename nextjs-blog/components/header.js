

// extract the <h1> welcome heading 

import styles from '../styles/Home.module.css';

export default function Header() {
    return (
        <h1
            className={styles.title}
            >
            {/* This is a comment inside jsx */}
            Welcome to <a href="https://nextjs.org">my portfolio website</a>
        </h1>
    );

}