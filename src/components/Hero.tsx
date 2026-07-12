import { CalendarDays, MapPinned, Route } from "lucide-react";
import styles from "../styles/HomePage.module.css";
import { tripConfig } from "../data/tripConfig";

export function Hero() {
  return (
    <header className={styles.hero} id="top">
      <img
        src="/images/hero/chongqing-night.webp"
        alt="重庆夜景"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = "/images/hero/chongqing-night.svg";
        }}
      />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <p className={styles.kicker}>{tripConfig.subtitle}</p>
        <h1>{tripConfig.title}</h1>
        <p className={styles.heroLead}>两人｜观音桥出发｜避暑慢游</p>
        <div className={styles.heroStats} aria-label="旅行概览">
          <span>
            <CalendarDays size={18} /> {tripConfig.dates}
          </span>
          <span>
            <Route size={18} /> 4天半
          </span>
          <span>
            <MapPinned size={18} /> 每天2—3个主要片区
          </span>
        </div>
        <div className={styles.heroActions}>
          <a href="#daily-plan" className={styles.primaryButton}>
            查看每日行程
          </a>
          <a href="#route-map" className={styles.secondaryButton}>
            查看完整路线
          </a>
        </div>
      </div>
    </header>
  );
}
