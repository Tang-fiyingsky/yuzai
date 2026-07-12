export type TransportMode = "walk" | "transit" | "taxi" | "cableway";

export type LinkType =
  | "amap"
  | "navigation"
  | "official-info"
  | "official-ticket"
  | "official-reservation"
  | "operation"
  | "third-party"
  | "notice";

export interface ExternalLink {
  id: string;
  label: string;
  url: string;
  type: LinkType;
  sourceName: string;
  checkedAt: string;
  official: boolean;
  note?: string;
}

export interface Coordinate {
  lng: number;
  lat: number;
}

export interface Attraction {
  id: string;
  name: string;
  address: string;
  district: string;
  lng?: number | null;
  lat?: number | null;
  coordinateSource?: "AMap" | "Manual fallback";
  coordinateCheckedAt?: string;
  image: string;
  imageAlt: string;
  description: string;
  recommendedTime: string;
  duration: string;
  indoorOutdoor: "室内" | "室外" | "混合";
  sunExposure: "低" | "中" | "高";
  stairs: "少" | "中等" | "较多";
  priceType: "免费" | "收费" | "待确认";
  reservation: "无需预约" | "可能需要" | "需提前确认";
  tags: string[];
  rating: number;
  notes: string[];
  externalLinkIds: string[];
}

export interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

export interface RouteSegment {
  id: string;
  from: string;
  to: string;
  mode: TransportMode;
  estimatedTime: string;
  estimatedDistance: string;
  uphill: "低" | "中" | "高" | "不适用";
  note?: string;
}

export interface TripDay {
  id: string;
  date: string;
  label: string;
  title: string;
  summary: string;
  timeline: TimelineItem[];
  attractions: string[];
  routeSegments: RouteSegment[];
  estimatedSteps: string;
  estimatedBudget: string;
  heatTip: string;
  rainBackup: string;
  highlight?: string;
}

export interface ImageCredit {
  attractionId: string;
  localPath: string;
  sourceName: string;
  sourceUrl: string;
  author: string;
  license: string;
  checkedAt: string;
  status: "confirmed" | "placeholder";
  note?: string;
}
