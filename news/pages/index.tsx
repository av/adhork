import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getNews, News } from "lib/hackernews";
import NewsCard from "components/NewsCard";
import { getAds, Ads } from "lib/ads";

export type HomeProps = {
  news: News;
  ads: Ads;
};

export default function Home({ news, ads }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Latest News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Latest News</h1>

        <div className={styles.grid}>
          {news.map((newsItem) => (
            <NewsCard
              item={newsItem}
              key={newsItem.id}
              className={styles.card}
            />
          ))}
        </div>

        <div className="ads-container">
          <small>Ads:</small>
          {ads.map((ad) => (
            <small data-e2e-ad-item>
              <a href={ad.url} target="_blank">
                {ad.title}
              </a>
            </small>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
      <style jsx>{`
        .ads-container {
          padding: 1rem;
          max-width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .ads-container > * {
          opacity: 0.5;
          margin: 0 0.5rem;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const news = await getNews();
  const ads = await getAds();

  return {
    props: {
      news,
      ads,
    },
  };
}
