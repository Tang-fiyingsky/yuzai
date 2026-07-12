import { Clock3 } from "lucide-react";
import styles from "../styles/HomePage.module.css";
import type { TimelineItem } from "../types/trip";

export function DayTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className={styles.timeline}>
      {items.map((item) => (
        <div className={styles.timelineItem} key={`${item.time}-${item.title}`}>
          <div className={styles.timelineTime}>
            <Clock3 size={16} />
            <span>{item.time}</span>
          </div>
          <div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
