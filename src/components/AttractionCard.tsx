import { ExternalLink, MapPinned, Navigation, Ticket, Clock, BadgeInfo } from "lucide-react";
import styles from "../styles/HomePage.module.css";
import { getExternalLinks } from "../data/externalLinks";
import type { Attraction } from "../types/trip";

const linkIcon = (type: string) => {
  if (type === "navigation") return Navigation;
  if (type === "amap") return MapPinned;
  if (type.includes("ticket")) return Ticket;
  if (type === "operation") return Clock;
  return ExternalLink;
};

export function AttractionCard({ attraction }: { attraction: Attraction }) {
  const links = getExternalLinks(attraction.externalLinkIds);
  const isTicketRequired = attraction.priceType === "收费";

  return (
    <article className={styles.attractionCard}>
      <div className={styles.attractionImageWrap}>
        <img
          src={attraction.image}
          alt={attraction.imageAlt}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = "/images/attractions/placeholder.svg";
          }}
        />
      </div>
      <div className={styles.attractionBody}>
        <div className={styles.cardTitleRow}>
          <h3>{attraction.name}</h3>
          <span className={styles.rating}>推荐 {attraction.rating}/5</span>
        </div>
        <p className={styles.description}>{attraction.description}</p>
        <div className={styles.metaGrid}>
          <span>到达：{attraction.recommendedTime}</span>
          <span>停留：{attraction.duration}</span>
          <span>{attraction.priceType}</span>
          <span>{attraction.reservation}</span>
          <span>{attraction.indoorOutdoor}</span>
          <span>暴晒 {attraction.sunExposure}</span>
          <span>爬坡/楼梯 {attraction.stairs}</span>
        </div>
        <div className={styles.tags}>
          {attraction.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {attraction.notes.length > 0 && (
          <ul className={styles.notes}>
            {attraction.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        )}
        {!isTicketRequired && <p className={styles.freeLine}>免费开放，开放时间和现场管理以出行当天官方信息为准。</p>}
        <div className={styles.cardActions}>
          {links.map((link) => {
            const Icon = linkIcon(link.type);
            return (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                <Icon size={16} />
                {link.label}
              </a>
            );
          })}
          <span className={styles.actionHint}>
            <BadgeInfo size={16} /> 查看开放时间
          </span>
        </div>
      </div>
    </article>
  );
}
