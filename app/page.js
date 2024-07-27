import Link from 'next/link';
import styles from './page.module.css';
import ImageSlideshow from '@/components/images/image-slideshow';

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.slideshow}>
          <ImageSlideshow />
        </div>

        <div className={styles.desc}>
          <h1>NextLevel Food</h1>
          <p>Taste food and share</p>
        </div>

        <div className={styles.cta}>
          <Link href={'/community'}>Join the Community</Link>
          <Link href={'/meals'}>Explore Meal</Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2>How it works</h2>
        <p>
          NextLevel Food is a platform for foodies to share their favorite
          recipes with the world. It&apos;s a place to discover new dishes, and
          to connect with other food lovers.
        </p>
        <p>
          NextLevel Food is a place to discover new dishes, and to connect with
          other food lovers.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Why NextLevel Food?</h2>
        <p>
          NextLevel Food is a platform for foodies to share their favorite
          recipes with the world. It&apos;s a place to discover new dishes, and
          to connect with other food lovers.
        </p>
        <p>
          NextLevel Food is a place to discover new dishes, and to connect with
          other food lovers.
        </p>
      </section>
    </main>
  );
}
