import type { Attraction, RouteSegment } from "../types/trip";
import { getAttractionCoordinate } from "./geocoder";

export interface PlannedSegmentResult {
  segmentId: string;
  ok: boolean;
  distanceText?: string;
  durationText?: string;
  error?: string;
}

const formatDistance = (meters?: number) => {
  if (!meters || Number.isNaN(meters)) return undefined;
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)}公里`;
  return `${Math.round(meters)}米`;
};

const formatDuration = (seconds?: number) => {
  if (!seconds || Number.isNaN(seconds)) return undefined;
  const minutes = Math.max(1, Math.round(seconds / 60));
  if (minutes >= 60) return `${Math.floor(minutes / 60)}小时${minutes % 60}分钟`;
  return `${minutes}分钟`;
};

export const planSegment = (
  AMap: any,
  map: any,
  segment: RouteSegment,
  from: Attraction,
  to: Attraction
): Promise<PlannedSegmentResult> => {
  if (segment.mode === "cableway") {
    const start = getAttractionCoordinate(from);
    const end = getAttractionCoordinate(to);
    const polyline = new AMap.Polyline({
      path: [
        [start.lng, start.lat],
        [end.lng, end.lat]
      ],
      strokeColor: "#d94b32",
      strokeWeight: 5,
      strokeOpacity: 0.85,
      strokeStyle: "dashed"
    });
    map.add(polyline);
    return Promise.resolve({
      segmentId: segment.id,
      ok: true,
      distanceText: segment.estimatedDistance,
      durationText: segment.estimatedTime
    });
  }

  const start = getAttractionCoordinate(from);
  const end = getAttractionCoordinate(to);
  const origin = [start.lng, start.lat];
  const destination = [end.lng, end.lat];

  const planner =
    segment.mode === "walk"
      ? new AMap.Walking({ map, hideMarkers: true })
      : segment.mode === "taxi"
        ? new AMap.Driving({ map, hideMarkers: true, policy: AMap.DrivingPolicy.LEAST_TIME })
        : new AMap.Transfer({
            map,
            city: "重庆",
            cityd: "重庆",
            hideMarkers: true,
            policy: AMap.TransferPolicy.LEAST_TIME
          });

  return new Promise((resolve) => {
    const callback = (status: string, result: any) => {
      if (status !== "complete") {
        resolve({ segmentId: segment.id, ok: false, error: "路线规划失败" });
        return;
      }

      const route = result?.routes?.[0] ?? result?.plans?.[0];
      resolve({
        segmentId: segment.id,
        ok: true,
        distanceText: formatDistance(route?.distance) ?? segment.estimatedDistance,
        durationText: formatDuration(route?.time ?? route?.duration) ?? segment.estimatedTime
      });
    };

    if (segment.mode === "transit") {
      planner.search(origin, destination, callback);
    } else {
      planner.search(origin, destination, callback);
    }
  });
};
