import { Suspense } from 'react';
import Link from 'next/link';

import { getMeals } from '@/lib/meals';
import MealsGrid from '@/components/meals/meals-grid';
import MealsLoadingPage from './loading-meal';
import styles from './page.module.css';

export const metadata = {
  title: 'All meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.desc}>
        <h1>
          Delicious meals, created{' '}
          <span className={styles.highlight}>by you</span>
          <p>
            Choose your favorite recipe and cook it yourself. It is easy and
            fun!
          </p>
          <p className={styles.cta}>
            <Link href='/meals/share'>Share your favorite recipe</Link>
          </p>
        </h1>
      </section>

      <Suspense fallback={<MealsLoadingPage />}>
        <Meals />
      </Suspense>
    </main>
  );
}
