import MealItem from './meal-item';
import styles from './meals-grid.module.css';

export default function MealsGrid({ meals }) {
  return (
    <ul className={styles.meals}>
      {map.meals((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
