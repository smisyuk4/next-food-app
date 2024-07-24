import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <header>
        <ul>
          <li>
            <Link href={'/meals'} aria-label='meals'>
              meals
            </Link>
          </li>
          <li>
            <Link href={'/meals/share'} aria-label='share'>
              share
            </Link>
          </li>
          <li>
            <Link href={'/community'} aria-label='community'>
              community
            </Link>
          </li>
        </ul>
      </header>
    </main>
  );
}
