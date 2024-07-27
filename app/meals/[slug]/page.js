import { notFound } from 'next/navigation';
import Image from 'next/image';

import { getMeal } from '@/lib/meals';
const { AWS_BUCKET_PATH } = process.env;
import styles from './page.module.css';

export async function generateMetadata({ params }) {
  const meal = getMeal(params.slug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.slug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions?.replace(/\n/g, '<br/>');

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image
            src={`https://${AWS_BUCKET_PATH}.s3.amazonaws.com/${meal.image}`}
            alt={meal.summary}
            fill
          />
        </div>

        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>

      <main className={styles.main}>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
