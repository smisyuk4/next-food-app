import { Suspense } from 'react';
import Link from 'next/link';

import { getMeals } from '@/lib/meals';
import MealsGrid from '@/components/meals/meals-grid';
import MealsLoadingPage from './loading-meal';
import styles from './page.module.css';

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={styles.header}>
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
      </header>

      <main className={styles.main}>
        <Suspense fallback={<MealsLoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
