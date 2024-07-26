import Link from 'next/link';

import MealsGrid from '@/components/meals/meals-grid';
import styles from './page.module.css';

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
        <MealsGrid meals={[]} />
      </main>
    </>
  );
}
