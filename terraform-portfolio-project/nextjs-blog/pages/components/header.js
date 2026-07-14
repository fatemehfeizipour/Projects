import styles from '../styles/Home.module.css';

export default function Footer() {
  return (
    <footer>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.logo}
      >
        Powered by <img src="/vercel.svg" alt="Vercel" className="logo" />
      </a>

      <style jsx>{`
        footer{
                  width: 100%;
                  height: 100px;
                  border-top: 1px solid #eaeaea;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                footer img {
                  margin-left: 0.5rem;
                }
                footer a {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-decoration: none;
                  color: inherit;
                }

       `}
       </style>
    </footer>
  );
}