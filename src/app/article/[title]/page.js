import { db } from "@/utils/dbConnectionString";
import Image from "next/image";
import InfoBox from "@/components/InfoBox";
import styles from "./article.module.css";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const articleParams = await params;
  const pageData = await db.query(`Select * from articles WHERE title= $1`, [
    articleParams.title,
  ]);
  return {
    title: `${pageData.title} - Ship Space`,
    description: pageData.intro,
  };
}
export default async function ArticlePage({ params }) {
  const titleParams = await params;
  const pageData = (
    await db.query(`SELECT * FROM articles WHERE title = $1`, [
      titleParams.title,
    ])
  ).rows;
  // console.log("Full page data:", pageData);
  // console.log("Initial traffic:", pageData[0].traffic);

  if (pageData.length === 0) {
    notFound();
  }

  let newTraffic = parseInt(pageData[0]?.traffic, 10) + 1;
  db.query(
    `UPDATE articles
    SET traffic = $1
    WHERE title = $2`,
    [newTraffic, titleParams.title]
  );
  // console.log("New traffic:", newTraffic);

  const infoObject = (
    await db.query(`SELECT * FROM info_box WHERE article_title = $1`, [
      titleParams.title,
    ])).rows[0];
  console.log("Info Box data:", infoObject);

  return (
    <>
      {pageData.map((article) => (
        <section className={styles.fullPage} key={article.id}>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.topDiv}>
            <p>{article.intro}</p>
            {infoObject ? <InfoBox info={infoObject} /> : null}
          </div>
          <section className={styles.mainContent}>
            <div className={styles.contentDiv}>
              {article?.sub1 ? (
                <h2 className={styles.subheading}>{article?.sub1}</h2>
              ) : null}
              {article?.content1 ? (
                <p className={styles.textContent}>{article?.content1}</p>
              ) : null}
              {article?.img1 ? (
                <Image
                  src={article?.img1}
                  alt={article?.alt1}
                  height={200}
                  width={200}
                />
              ) : null}
            </div>
            <div className={styles.contentDiv}>
              {article?.sub2 ? (
                <h2 className={styles.subheading}>{article?.sub2}</h2>
              ) : null}
              {article?.content2 ? (
                <p className={styles.textContent}>{article?.content2}</p>
              ) : null}
              {article?.img2 ? (
                <Image
                  src={article?.img2}
                  alt={article?.alt2}
                  height={200}
                  width={200}
                />
              ) : null}
            </div>
            <div className={styles.contentDiv}>
              {article?.sub3 ? (
                <h2 className={styles.subheading}>{article?.sub3}</h2>
              ) : null}
              {article?.content3 ? (
                <p className={styles.textContent}>{article?.content3}</p>
              ) : null}
              {article?.img3 ? (
                <Image
                  src={article?.img3}
                  alt={article?.alt3}
                  height={200}
                  width={200}
                />
              ) : null}
            </div>
            <Link href={`/article/${titleParams.title}/update-article`}>
              <button>Edit this article</button>
            </Link>
          </section>
        </section>
      ))}
    </>
  );
}
