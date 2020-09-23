import Head from "next/head";
import styles from "../styles/Home.module.css";
import hasura from "lib/hasura";
import { adStatsQuery, adsQuery } from "lib/queries/ads";
import { AdStats } from "lib/ads";
import AdItem from "components/AdItem";

export type HomeProps = {
  stats: AdStats[];
};

export default function Home({ stats }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ads Administration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Ads Administration</h1>

        <div className={styles.grid}>
          {stats.map((item) => (
            <AdItem item={item} key={item.ad.id} className={styles.card} />
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
    </div>
  );
}

export async function getServerSideProps() {
  const { ads } = await hasura.request(adsQuery);
  const stats = await Promise.all(
    ads.map((ad) =>
      hasura
        .request(adStatsQuery, {
          id: ad.id,
        })
        .then((data) => data.ad_stats_daily[0])
        .then((stats) => ({ ad, stats }))
    )
  );

  return {
    props: { stats },
  };
}
