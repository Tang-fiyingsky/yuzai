import { useMemo, useState } from "react";
import { ArrowUp } from "lucide-react";
import styles from "../styles/HomePage.module.css";
import { Hero } from "../components/Hero";
import { TripOverview } from "../components/TripOverview";
import { DayTabs } from "../components/DayTabs";
import { DayTimeline } from "../components/DayTimeline";
import { AttractionCard } from "../components/AttractionCard";
import { DailyRouteMap } from "../components/DailyRouteMap";
import { BudgetCard } from "../components/BudgetCard";
import { FoodTips } from "../components/FoodTips";
import { PackingChecklist } from "../components/PackingChecklist";
import { ImageCredits } from "../components/ImageCredits";
import { itinerary } from "../data/itinerary";
import { getAttraction } from "../data/attractions";

export function HomePage() {
  const [activeDayId, setActiveDayId] = useState(itinerary[0].id);
  const activeDay = useMemo(() => itinerary.find((day) => day.id === activeDayId) ?? itinerary[0], [activeDayId]);
  const uniqueAttractions = activeDay.attractions.filter((id, index, list) => list.indexOf(id) === index && id !== "hotel");

  return (
    <>
      <Hero />
      <main>
        <TripOverview />
        <section className={styles.section} id="daily-plan" aria-labelledby="daily-title">
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>每日行程导航</p>
            <h2 id="daily-title">按日期切换，地图只加载当天路线。</h2>
          </div>
          <DayTabs days={itinerary} activeDayId={activeDayId} onChange={setActiveDayId} />
          <article className={styles.dayPanel}>
            <div className={styles.dayHero}>
              <div>
                <p className={styles.kicker}>{activeDay.date}</p>
                <h2>{activeDay.title}</h2>
                <p>{activeDay.summary}</p>
              </div>
              <div className={styles.dayFacts}>
                <span>预算：{activeDay.estimatedBudget}</span>
                <span>步数：{activeDay.estimatedSteps}</span>
              </div>
            </div>
            {activeDay.highlight && <div className={styles.alert}>{activeDay.highlight}</div>}
            <DayTimeline items={activeDay.timeline} />
            <div className={styles.attractionGrid}>
              {uniqueAttractions.map((id) => (
                <AttractionCard key={id} attraction={getAttraction(id)} />
              ))}
            </div>
            <DailyRouteMap day={activeDay} />
            <div className={styles.dayTips}>
              <article>
                <h3>怕热提醒</h3>
                <p>{activeDay.heatTip}</p>
              </article>
              <article>
                <h3>下雨备用建议</h3>
                <p>{activeDay.rainBackup}</p>
              </article>
            </div>
          </article>
        </section>
        <FoodTips />
        <BudgetCard />
        <PackingChecklist />
      </main>
      <footer className={styles.footer}>
        <ImageCredits />
        <p>所有票价、开放时间、预约规则、交通耗时以出行当天官方信息和高德地图实时结果为准。</p>
        <a href="#top" className={styles.backTop} aria-label="返回顶部">
          <ArrowUp size={18} />
          返回顶部
        </a>
      </footer>
    </>
  );
}
