import styles from "../styles/HomePage.module.css";

const rows = [
  ["四天半餐饮", "350—500元"],
  ["轨道交通和网约车", "100—180元"],
  ["长江索道", "以官方实时价格为准"],
  ["饮品、夜宵和零食", "80—150元"],
  ["总计", "约560—860元"]
];

export function BudgetCard() {
  return (
    <section className={styles.section} aria-labelledby="budget-title">
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>预算</p>
        <h2 id="budget-title">不租车，不跑远，钱花在吃饭和舒服转场上。</h2>
      </div>
      <div className={styles.budgetTable} role="table" aria-label="每人预计花费">
        {rows.map(([item, amount]) => (
          <div className={styles.budgetRow} role="row" key={item}>
            <span role="cell">{item}</span>
            <strong role="cell">{amount}</strong>
          </div>
        ))}
      </div>
      <div className={styles.notice}>
        不安排武隆一日游，不需要租车；重庆主城区采用轨道交通加短距离网约车更合适。所有票价和开放时间以出行当天官方信息为准。
      </div>
    </section>
  );
}
