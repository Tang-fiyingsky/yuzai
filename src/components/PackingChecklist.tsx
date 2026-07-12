import { useEffect, useState } from "react";
import styles from "../styles/HomePage.module.css";

const items = [
  "身份证",
  "手机充电器",
  "充电宝",
  "防晒霜",
  "遮阳帽",
  "折叠伞",
  "小风扇",
  "带大疆",
  "运动鞋",
  "水",
  "肠胃药",
  "驱蚊用品",
  "查看航班航站楼",
  "查看长江索道运营情况",
  "确认酒店准确地址"
];

const storageKey = "cq-couple-trip-packing";

export function PackingChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setChecked(JSON.parse(stored) as Record<string, boolean>);
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked]);

  return (
    <section className={styles.section} aria-labelledby="packing-title">
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>出行准备</p>
        <h2 id="packing-title">准备清单</h2>
      </div>
      <div className={styles.checklist}>
        {items.map((item) => (
          <label key={item} className={styles.checkItem}>
            <input
              type="checkbox"
              checked={Boolean(checked[item])}
              onChange={(event) => setChecked((prev) => ({ ...prev, [item]: event.target.checked }))}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
