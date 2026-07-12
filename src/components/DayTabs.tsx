import styles from "../styles/HomePage.module.css";
import type { TripDay } from "../types/trip";

interface DayTabsProps {
  days: TripDay[];
  activeDayId: string;
  onChange: (dayId: string) => void;
}

export function DayTabs({ days, activeDayId, onChange }: DayTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="每日行程">
      {days.map((day) => (
        <button
          key={day.id}
          type="button"
          role="tab"
          aria-selected={activeDayId === day.id}
          className={activeDayId === day.id ? styles.activeTab : styles.tab}
          onClick={() => onChange(day.id)}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}
