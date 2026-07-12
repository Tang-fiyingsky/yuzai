import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/HomePage.module.css";
import { getAttraction } from "../data/attractions";
import type { TripDay } from "../types/trip";
import { getAttractionCoordinate, isCoordinateFallback } from "../services/geocoder";
import { getAmapConfig, loadAmap } from "../services/amapLoader";
import { planSegment, type PlannedSegmentResult } from "../services/routePlanner";
import { RouteSegment } from "./RouteSegment";

export function DailyRouteMap({ day }: { day: TripDay }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "fallback">("idle");
  const [message, setMessage] = useState("");
  const [planned, setPlanned] = useState<PlannedSegmentResult[]>([]);
  const amapReady = getAmapConfig().ready;

  const dayAttractions = useMemo(() => day.attractions.map(getAttraction), [day]);

  useEffect(() => {
    let disposed = false;

    const init = async () => {
      if (!containerRef.current) return;
      if (!amapReady) {
        setStatus("fallback");
        setMessage("地图暂时无法加载：高德地图 Key 或安全密钥未配置。请使用下方文字路线或点击高德地图导航。");
        return;
      }

      setStatus("loading");
      try {
        const AMap = await loadAmap();
        if (disposed || !containerRef.current) return;

        const points = dayAttractions.map(getAttractionCoordinate);
        const center = points.reduce(
          (acc, point) => ({ lng: acc.lng + point.lng / points.length, lat: acc.lat + point.lat / points.length }),
          { lng: 0, lat: 0 }
        );

        const map = new AMap.Map(containerRef.current, {
          city: "重庆",
          center: [center.lng, center.lat],
          zoom: 12,
          resizeEnable: true,
          viewMode: "2D"
        });
        mapRef.current = map;
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.ToolBar({ position: "RB" }));

        const markers = dayAttractions.map((attraction, index) => {
          const point = getAttractionCoordinate(attraction);
          const marker = new AMap.Marker({
            position: [point.lng, point.lat],
            title: attraction.name,
            label: {
              content: `<span class="amap-number-marker">${index + 1}</span>`,
              direction: "center"
            },
            anchor: "bottom-center"
          });
          const info = new AMap.InfoWindow({
            content: `<div class="amap-info-card"><strong>${attraction.name}</strong><p>${attraction.duration}</p><p>${attraction.notes[0] ?? ""}</p></div>`,
            offset: new AMap.Pixel(0, -28)
          });
          marker.on("click", () => info.open(map, marker.getPosition()));
          return marker;
        });
        map.add(markers);

        const results = await Promise.all(
          day.routeSegments.map((segment) => planSegment(AMap, map, segment, getAttraction(segment.from), getAttraction(segment.to)))
        );
        if (disposed) return;
        setPlanned(results);
        map.setFitView(undefined, false, [50, 50, 50, 50]);
        setStatus("ready");
      } catch (error) {
        if (disposed) return;
        setStatus("fallback");
        setMessage(
          error instanceof Error
            ? `地图暂时无法加载：${error.message}。请使用下方文字路线或点击高德地图导航。`
            : "地图暂时无法加载，请使用下方文字路线或点击高德地图导航。"
        );
      }
    };

    init();

    return () => {
      disposed = true;
      mapRef.current?.destroy?.();
      mapRef.current = null;
    };
  }, [amapReady, day, dayAttractions]);

  const hasFallbackCoordinate = dayAttractions.some(isCoordinateFallback);

  return (
    <div className={styles.mapBlock} id="route-map">
      <div className={styles.mapHeader}>
        <div>
          <p className={styles.kicker}>当天路线地图</p>
          <h3>{day.label} 独立路线图</h3>
        </div>
        {status === "loading" && <span className={styles.mapStatus}>地图加载中...</span>}
        {status === "ready" && <span className={styles.mapStatus}>路线已尝试规划</span>}
      </div>
      {hasFallbackCoordinate && <div className={styles.notice}>酒店精确坐标未配置，涉及酒店的路线暂以观音桥步行街坐标计算。</div>}
      {status === "fallback" && <div className={styles.mapFallback}>{message}</div>}
      <div ref={containerRef} className={styles.mapCanvas} aria-label={`${day.label} 高德地图路线`} />
      {planned.some((item) => !item.ok) && (
        <div className={styles.notice}>部分路线规划失败，已保留文字路线和高德外部导航按钮。</div>
      )}
      <div className={styles.routeList}>
        {day.routeSegments.map((segment) => (
          <RouteSegment key={segment.id} segment={segment} from={getAttraction(segment.from)} to={getAttraction(segment.to)} />
        ))}
      </div>
    </div>
  );
}
