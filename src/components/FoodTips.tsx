import styles from "../styles/HomePage.module.css";

export function FoodTips() {
  return (
    <section className={styles.section} aria-labelledby="food-title">
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>饮食提醒</p>
        <h2 id="food-title">一辣一不辣怎么吃</h2>
      </div>
      <div className={styles.foodGrid}>
        <article>
          <h3>火锅</h3>
          <p>优先选择鸳鸯锅，提前确认清汤或番茄锅；红锅和清汤锅使用不同公筷，不吃辣的人不要只说“微辣”。</p>
        </article>
        <article>
          <h3>小面</h3>
          <p>能吃辣选重庆小面或豌杂面；不能吃辣要明确说“清汤、不要辣椒、不要红油”。</p>
        </article>
        <article>
          <h3>江湖菜</h3>
          <p>推荐“一道辣菜＋两道不辣菜＋一份主食”。温和选择包括豆花饭、蹄花汤、清汤抄手、蒸菜、番茄类菜品、冰粉、凉虾、汤圆。</p>
        </article>
      </div>
    </section>
  );
}
