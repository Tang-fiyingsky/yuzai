import { Banknote, BedDouble, Clock, Plane, Shield, TrainFront, UsersRound, Utensils } from "lucide-react";
import styles from "../styles/HomePage.module.css";
import { tripConfig } from "../data/tripConfig";

const overview = [
  { icon: Plane, label: "出行日期", value: "2026年7月15日—7月19日" },
  { icon: Plane, label: "抵达和返程机场", value: "重庆江北国际机场" },
  { icon: BedDouble, label: "酒店区域", value: tripConfig.hotel.name },
  { icon: UsersRound, label: "旅行人数", value: "两人，情侣，19—21岁" },
  { icon: Banknote, label: "每日预算", value: "每人每天200—300元" },
  { icon: Clock, label: "建议作息", value: "9:30左右起床，最晚可玩到24:00" },
  { icon: TrainFront, label: "交通方式", value: "轨道交通 + 短距离网约车" },
  { icon: Utensils, label: "吃辣差异", value: "一人很能吃辣，一人几乎不能吃辣" },
  { icon: Shield, label: "怕热提醒", value: "上午睡够，中午避暑，傍晚出发，夜景收尾" }
];

export function TripOverview() {
  return (
    <section className={styles.section} aria-labelledby="overview-title">
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>旅行概览</p>
        <h2 id="overview-title">上午睡够，中午避暑，傍晚出发，夜景收尾。</h2>
      </div>
      <div className={styles.overviewGrid}>
        {overview.map((item) => {
          const Icon = item.icon;
          return (
            <article className={styles.overviewCard} key={item.label}>
              <Icon size={22} aria-hidden="true" />
              <div>
                <p>{item.label}</p>
                <strong>{item.value}</strong>
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.notice}>
        酒店坐标现在仍是可配置状态。补充精确经纬度前，地图会以观音桥步行街作为酒店路线的临时起终点。
      </div>
    </section>
  );
}
