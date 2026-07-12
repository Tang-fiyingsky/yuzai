import type { TripDay } from "../types/trip";

export const itinerary: TripDay[] = [
  {
    id: "day1",
    date: "2026-07-15",
    label: "7月15日",
    title: "抵达重庆，观音桥周边轻松适应",
    summary: "第一天以休息和适应重庆为主，中午不要在户外长时间停留。",
    attractions: ["airport", "hotel", "guanyinqiao", "beicang", "taping", "hotel"],
    timeline: [
      { time: "12:00", title: "抵达重庆江北国际机场", description: "取行李、确认交通方式。" },
      { time: "12:00—14:00", title: "前往酒店", description: "轨道交通或网约车，先不赶景点。" },
      { time: "14:00—17:30", title: "入住、吃饭、休息", description: "优先补水和午休。" },
      { time: "18:00—19:00", title: "观音桥步行街", description: "从酒店轻松步行，适应周边。" },
      { time: "19:00—20:30", title: "北仓文创街区", description: "咖啡、小店、慢走。" },
      { time: "20:30—22:00", title: "塔坪社区", description: "吃夜宵或体验市井街巷。" },
      { time: "22:00以后", title: "返回酒店", description: "累了就网约车，不硬走。" }
    ],
    routeSegments: [
      { id: "d1-1", from: "airport", to: "hotel", mode: "transit", estimatedTime: "约60—90分钟", estimatedDistance: "约25—32公里", uphill: "低", note: "轨道交通或网约车，按行李数量决定。" },
      { id: "d1-2", from: "hotel", to: "guanyinqiao", mode: "walk", estimatedTime: "约5—15分钟", estimatedDistance: "约0.3—1公里", uphill: "低" },
      { id: "d1-3", from: "guanyinqiao", to: "beicang", mode: "walk", estimatedTime: "约10—18分钟", estimatedDistance: "约0.8—1.2公里", uphill: "低" },
      { id: "d1-4", from: "beicang", to: "taping", mode: "walk", estimatedTime: "约8—15分钟", estimatedDistance: "约0.6—1公里", uphill: "低" },
      { id: "d1-5", from: "taping", to: "hotel", mode: "walk", estimatedTime: "约8—20分钟", estimatedDistance: "约0.6—1.5公里", uphill: "低", note: "太晚或下雨就网约车。" }
    ],
    estimatedSteps: "7000—10000步",
    estimatedBudget: "每人约80—150元",
    heatTip: "抵达日别在中午硬逛，先把体力留给夜晚。",
    rainBackup: "观音桥商场和北仓店铺都适合临时避雨。"
  },
  {
    id: "day2",
    date: "2026-07-16",
    label: "7月16日",
    title: "轻轨穿楼与山城高处",
    summary: "把户外活动放到下午后半段，李子坝到鹅岭二厂建议网约车。",
    attractions: ["hotel", "liziba", "eling2", "elingpark", "hotel"],
    timeline: [
      { time: "09:30", title: "起床", description: "不早起，慢慢出门。" },
      { time: "10:30—15:30", title: "早午饭、商场或酒店避暑", description: "避开最热时间。" },
      { time: "16:30—17:30", title: "李子坝轻轨穿楼", description: "看车进楼，短暂停留。" },
      { time: "17:30—18:00", title: "网约车前往鹅岭二厂", description: "避免爬坡消耗。" },
      { time: "18:00—19:15", title: "鹅岭二厂", description: "文创街区慢逛。" },
      { time: "19:15—20:30", title: "鹅岭公园", description: "天气好再去看夜景。" },
      { time: "20:30以后", title: "晚饭并返回观音桥", description: "轨道交通或网约车。" }
    ],
    routeSegments: [
      { id: "d2-1", from: "hotel", to: "liziba", mode: "transit", estimatedTime: "约35—55分钟", estimatedDistance: "约8—12公里", uphill: "低" },
      { id: "d2-2", from: "liziba", to: "eling2", mode: "taxi", estimatedTime: "约10—20分钟", estimatedDistance: "约2—3公里", uphill: "高", note: "不建议步行爬坡。" },
      { id: "d2-3", from: "eling2", to: "elingpark", mode: "walk", estimatedTime: "约15—25分钟", estimatedDistance: "约1公里", uphill: "中" },
      { id: "d2-4", from: "elingpark", to: "hotel", mode: "transit", estimatedTime: "约35—60分钟", estimatedDistance: "约8—12公里", uphill: "低", note: "累了直接打车。" }
    ],
    estimatedSteps: "10000—13000步",
    estimatedBudget: "每人约100—180元",
    heatTip: "下午炎热时不要提前出发。",
    rainBackup: "天气不好时取消鹅岭公园，改为观音桥商场晚饭。"
  },
  {
    id: "day3",
    date: "2026-07-17",
    label: "7月17日",
    title: "山城老街与洪崖洞夜景",
    summary: "十八梯由高向低走，洪崖洞只看外部夜景，减少上下楼。",
    attractions: ["hotel", "shibati", "jiefangbei", "hongyadong", "qiansimen", "hotel"],
    timeline: [
      { time: "09:30", title: "起床", description: "上午继续慢节奏。" },
      { time: "10:30—14:30", title: "吃饭和休息", description: "等最热时段过去。" },
      { time: "15:00—17:00", title: "十八梯", description: "尽量由高向低游览。" },
      { time: "17:00—18:30", title: "解放碑和晚饭", description: "排队超过30分钟就换店。" },
      { time: "19:00—20:30", title: "洪崖洞", description: "重点看外部夜景。" },
      { time: "20:30—21:30", title: "千厮门大桥周边", description: "江景和桥景收尾。" },
      { time: "21:30以后", title: "返回酒店", description: "轨道交通或网约车。" }
    ],
    routeSegments: [
      { id: "d3-1", from: "hotel", to: "shibati", mode: "transit", estimatedTime: "约35—55分钟", estimatedDistance: "约9—13公里", uphill: "低" },
      { id: "d3-2", from: "shibati", to: "jiefangbei", mode: "walk", estimatedTime: "约15—25分钟", estimatedDistance: "约1公里", uphill: "中" },
      { id: "d3-3", from: "jiefangbei", to: "hongyadong", mode: "walk", estimatedTime: "约15—25分钟", estimatedDistance: "约1.1公里", uphill: "中" },
      { id: "d3-4", from: "hongyadong", to: "qiansimen", mode: "walk", estimatedTime: "约10—20分钟", estimatedDistance: "约0.8公里", uphill: "中" },
      { id: "d3-5", from: "qiansimen", to: "hotel", mode: "transit", estimatedTime: "约35—60分钟", estimatedDistance: "约10—14公里", uphill: "低" }
    ],
    estimatedSteps: "12000—15000步",
    estimatedBudget: "每人约120—220元",
    heatTip: "十八梯有台阶，午后仍热时多进店休息。",
    rainBackup: "下雨时先在解放碑商场等雨小，再决定是否看洪崖洞外景。"
  },
  {
    id: "day4",
    date: "2026-07-18",
    label: "7月18日",
    title: "南岸老街、江边散步与长江索道",
    summary: "今天重点不是赶景点，而是南岸老街、江边和单程索道体验。",
    attractions: ["hotel", "longmenhao", "xiahaoli", "nanbinroad", "cableway-south", "cableway-north", "hotel"],
    timeline: [
      { time: "09:30", title: "起床", description: "保持慢游节奏。" },
      { time: "10:30—13:30", title: "早午饭并前往南岸", description: "轨道交通为主。" },
      { time: "14:00—15:30", title: "龙门浩老街", description: "慢慢走，热了就进店。" },
      { time: "15:30—17:30", title: "下浩里", description: "更安静的街巷体验。" },
      { time: "17:30—19:30", title: "南滨路晚饭和散步", description: "江边散步比赶景点更重要。" },
      { time: "20:00左右", title: "长江索道单程体验", description: "排队过长可直接放弃。" },
      { time: "21:00以后", title: "返回酒店", description: "北站出来后轨道交通或网约车。" }
    ],
    routeSegments: [
      { id: "d4-1", from: "hotel", to: "longmenhao", mode: "transit", estimatedTime: "约45—70分钟", estimatedDistance: "约12—16公里", uphill: "低" },
      { id: "d4-2", from: "longmenhao", to: "xiahaoli", mode: "walk", estimatedTime: "约15—25分钟", estimatedDistance: "约1公里", uphill: "中" },
      { id: "d4-3", from: "xiahaoli", to: "nanbinroad", mode: "walk", estimatedTime: "约15—30分钟", estimatedDistance: "约1—1.5公里", uphill: "低" },
      { id: "d4-4", from: "nanbinroad", to: "cableway-south", mode: "walk", estimatedTime: "约15—30分钟", estimatedDistance: "约1—1.5公里", uphill: "中", note: "觉得累就短距离网约车。" },
      { id: "d4-5", from: "cableway-south", to: "cableway-north", mode: "cableway", estimatedTime: "乘坐约5分钟，排队另计", estimatedDistance: "跨江体验段", uphill: "不适用", note: "长江索道体验段，不代表普通步行或驾车路线。" },
      { id: "d4-6", from: "cableway-north", to: "hotel", mode: "transit", estimatedTime: "约35—60分钟", estimatedDistance: "约10—14公里", uphill: "低" }
    ],
    estimatedSteps: "10000—14000步",
    estimatedBudget: "每人约140—260元，索道以官方实时价格为准",
    heatTip: "南岸街巷台阶多，任何时候都可以少走一段改网约车。",
    rainBackup: "下雨时先进入附近商场、餐厅或咖啡店，不在石阶上赶路。"
  },
  {
    id: "day5",
    date: "2026-07-19",
    label: "7月19日",
    title: "观音桥休整与返程",
    summary: "最后一天不安排远距离景点，建议14:00前出发前往机场。",
    highlight: "建议14:00前出发前往机场",
    attractions: ["hotel", "guanyinqiao", "hotel", "airport"],
    timeline: [
      { time: "09:30", title: "起床", description: "收拾行李。" },
      { time: "10:30", title: "退房并寄存行李", description: "确认酒店寄存规则。" },
      { time: "11:00—12:00", title: "观音桥午饭", description: "就近吃饭。" },
      { time: "12:00—13:00", title: "简单逛街或购买伴手礼", description: "不要走远。" },
      { time: "13:30", title: "返回酒店取行李", description: "预留缓冲。" },
      { time: "14:00", title: "前往江北机场", description: "根据航站楼、托运行李和实时交通调整。" },
      { time: "17:10", title: "航班起飞", description: "以航空公司通知为准。" }
    ],
    routeSegments: [
      { id: "d5-1", from: "hotel", to: "guanyinqiao", mode: "walk", estimatedTime: "约5—15分钟", estimatedDistance: "约0.3—1公里", uphill: "低" },
      { id: "d5-2", from: "guanyinqiao", to: "hotel", mode: "walk", estimatedTime: "约5—15分钟", estimatedDistance: "约0.3—1公里", uphill: "低" },
      { id: "d5-3", from: "hotel", to: "airport", mode: "transit", estimatedTime: "约60—90分钟", estimatedDistance: "约25—32公里", uphill: "低", note: "建议14:00前出发，托运行李和高峰期要再提前。" }
    ],
    estimatedSteps: "5000—8000步",
    estimatedBudget: "每人约80—150元",
    heatTip: "最后一天不要安排远距离景点，体力留给返程。",
    rainBackup: "观音桥商场内解决午饭和伴手礼。"
  }
];
