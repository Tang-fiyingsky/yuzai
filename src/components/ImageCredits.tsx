import { useState } from "react";
import styles from "../styles/HomePage.module.css";
import { imageCredits } from "../data/imageCredits";

export function ImageCredits() {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.credits}>
      <button type="button" onClick={() => setOpen((value) => !value)} className={styles.textButton}>
        图片来源与版权说明
      </button>
      {open && (
        <div className={styles.creditPanel}>
          {imageCredits.map((credit) => (
            <article key={`${credit.attractionId}-${credit.localPath}`}>
              <strong>{credit.attractionId}</strong>
              <p>
                {credit.status === "confirmed" ? "已确认" : "占位"}｜{credit.sourceName}｜{credit.author}｜{credit.license}
              </p>
              <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer">
                {credit.sourceUrl}
              </a>
              {credit.note && <p>{credit.note}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
