import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Card from '../components/card';
import Footer from '../components/footer';
import Header from '../components/header';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header/>

        <p className={styles.description}>
          <code>James Smith, freelance web designer</code>
        </p>

        <div className={styles.grid}>
          <Card
            link="https://nextjs.org/docs"
            title="Documentation"
            description="Personal technical notes and structured learning summaries from my AWS journey"
            />

          <Card
            title="Learn"
            description="Hands-on learning journey through AWS Cloud Engineer Academy and personal practice"
            link="https://nextjs.org/learn"
            />

{/*This card will NOT open in a new tab — normal same-page navigation*/}
          <Card
            title="Projects"
            description="End-to-end cloud solutions that I design and build to simulate real-world AWS environments"
            link="https://github.com/vercel/next.js/tree/canary/examples"
            />

 {/*This card WILL open in a new tab*/}
          <Card
            title="cloud-portfolio"
            description="My main GitHub showcase that represents my growth as a Cloud Engineer"
            link="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            external
            />
        </div>
      </main>

        <Footer/>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}