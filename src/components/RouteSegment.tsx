import { Cable, CarTaxiFront, Footprints, MapPinned, TrainFront } from "lucide-react";
import styles from "../styles/HomePage.module.css";
import type { Attraction, RouteSegment as RouteSegmentType } from "../types/trip";
import { getAttractionCoordinate } from "../services/geocoder";

const modeLabels = {
  walk: "步行",
  transit: "轨道交通/公交",
  taxi: "网约车/出租车",
  cableway: "长江索道"
};

const modeIcons = {
  walk: Footprints,
  transit: TrainFront,
  taxi: CarTaxiFront,
  cableway: Cable
};

export function RouteSegment({
  segment,
  from,
  to
}: {
  segment: RouteSegmentType;
  from: Attraction;
  to: Attraction;
}) {
  const Icon = modeIcons[segment.mode];
  const end = getAttractionCoordinate(to);
  const amapUrl = `https://uri.amap.com/navigation?to=${end.lng},${end.lat},${encodeURIComponent(to.name)}&mode=car&src=chongqing-couple-trip`;

  return (
    <article className={styles.routeSegment}>
      <div className={styles.routeIcon}>
        <Icon size={20} />
      </div>
      <div>
        <h4>
          {from.name} <span>→</span> {to.name}
        </h4>
        <p>
          {modeLabels[segment.mode]}｜{segment.estimatedTime}｜{segment.estimatedDistance}｜爬坡 {segment.uphill}
        </p>
        {segment.note && <p className={styles.segmentNote}>{segment.note}</p>}
      </div>
      <a href={amapUrl} target="_blank" rel="noopener noreferrer" aria-label={`在高德地图打开 ${from.name} 到 ${to.name}`}>
        <MapPinned size={16} />
        在高德地图打开
      </a>
    </article>
  );
}
