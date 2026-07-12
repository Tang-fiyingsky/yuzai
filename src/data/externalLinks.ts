import type { ExternalLink } from "../types/trip";

const amapMarker = (name: string, lng: number, lat: number) =>
  `https://uri.amap.com/marker?position=${lng},${lat}&name=${encodeURIComponent(name)}&src=chongqing-couple-trip`;

const amapRoute = (name: string, lng: number, lat: number) =>
  `https://uri.amap.com/navigation?to=${lng},${lat},${encodeURIComponent(name)}&mode=car&policy=1&src=chongqing-couple-trip`;

export const externalLinks: ExternalLink[] = [
  {
    id: "yangtze-cableway-official",
    label: "长江索道官方查询入口",
    url: "https://www.cqsuodao.com/",
    type: "operation",
    sourceName: "重庆市客运索道有限公司",
    checkedAt: "2026-07-12",
    official: true,
    note: "如官方购票仍以微信服务号为主，页面仅显示查询入口和微信搜索提示。"
  },
  {
    id: "hongyadong-official-info",
    label: "洪崖洞官方景区信息",
    url: "https://www.hongyadong.com/",
    type: "official-info",
    sourceName: "洪崖洞景区",
    checkedAt: "2026-07-12",
    official: true,
    note: "未在页面内硬写预约规则，出行当天以官方发布为准。"
  },
  {
    id: "cq-culture-travel",
    label: "重庆市文化和旅游发展委员会",
    url: "https://whlyw.cq.gov.cn/",
    type: "official-info",
    sourceName: "重庆市文化和旅游发展委员会",
    checkedAt: "2026-07-12",
    official: true
  },
  {
    id: "cq-airport-official",
    label: "江北国际机场官方信息",
    url: "https://www.cqa.cn/",
    type: "official-info",
    sourceName: "重庆机场集团",
    checkedAt: "2026-07-12",
    official: true
  },
  {
    id: "jiefangbei-official-info",
    label: "渝中区文旅查询",
    url: "https://www.cqyz.gov.cn/",
    type: "official-info",
    sourceName: "重庆市渝中区人民政府",
    checkedAt: "2026-07-12",
    official: true
  },
  ...[
    ["airport", "重庆江北国际机场", 106.64197, 29.71916],
    ["guanyinqiao", "观音桥步行街", 106.53229, 29.57429],
    ["beicang", "北仓文创街区", 106.53387, 29.5811],
    ["taping", "塔坪社区", 106.52995, 29.5795],
    ["liziba", "李子坝轻轨穿楼观景平台", 106.53955, 29.55261],
    ["eling2", "鹅岭二厂", 106.5406, 29.55508],
    ["elingpark", "鹅岭公园", 106.5476, 29.55503],
    ["shibati", "十八梯传统风貌区", 106.57493, 29.55452],
    ["jiefangbei", "解放碑", 106.57708, 29.55773],
    ["hongyadong", "洪崖洞", 106.58318, 29.56226],
    ["qiansimen", "千厮门大桥", 106.58535, 29.56558],
    ["longmenhao", "龙门浩老街", 106.58828, 29.54813],
    ["xiahaoli", "下浩里", 106.5851, 29.54633],
    ["nanbinroad", "南滨路", 106.59228, 29.5411],
    ["cableway-south", "长江索道南站", 106.58611, 29.54827],
    ["cableway-north", "长江索道北站", 106.57979, 29.55664]
  ].flatMap(([id, name, lng, lat]) => [
    {
      id: `${id}-amap`,
      label: "在高德地图查看",
      url: amapMarker(name as string, lng as number, lat as number),
      type: "amap" as const,
      sourceName: "高德地图 URI",
      checkedAt: "2026-07-12",
      official: true
    },
    {
      id: `${id}-nav`,
      label: "导航到这里",
      url: amapRoute(name as string, lng as number, lat as number),
      type: "navigation" as const,
      sourceName: "高德地图 URI",
      checkedAt: "2026-07-12",
      official: true
    }
  ])
];

export const getExternalLinks = (ids: string[]) =>
  ids.map((id) => externalLinks.find((link) => link.id === id)).filter(Boolean) as ExternalLink[];
