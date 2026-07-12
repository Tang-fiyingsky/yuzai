import type { ImageCredit } from "../types/trip";

const checkedAt = "2026-07-12";

export const imageCredits: ImageCredit[] = [
  {
    attractionId: "hero",
    localPath: "/images/hero/chongqing-night.webp",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/Category:Night_in_Chongqing",
    author: "详见原始文件页",
    license: "以原始文件页标注为准",
    checkedAt,
    status: "placeholder",
    note: "当前项目内使用占位图；替换为真实授权夜景图后请更新此记录。"
  },
  ...[
    "airport",
    "guanyinqiao",
    "beicang",
    "taping",
    "liziba",
    "eling2",
    "elingpark",
    "shibati",
    "jiefangbei",
    "hongyadong",
    "qiansimen",
    "longmenhao",
    "xiahaoli",
    "nanbinroad",
    "cableway-south",
    "cableway-north",
    "hotel"
  ].map((id) => ({
    attractionId: id,
    localPath: `/images/attractions/${id === "hotel" ? "placeholder" : id}.webp`,
    sourceName: "本项目默认占位图",
    sourceUrl: "public/images/attractions/placeholder.svg",
    author: "Codex",
    license: "项目占位图，不代表真实景点图片",
    checkedAt,
    status: "placeholder" as const,
    note: "尚未确认可下载并可复用的准确景点图片，请替换后更新版权记录。"
  }))
];
