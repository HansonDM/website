/** Custom scenario artwork, never client logos or proof of business outcomes. */
export const caseIllustrations = [
  {
    "id": "company-01",
    "alt": "跨境品牌台灣營運規劃",
    "src": "/case-icons/v1/company-01.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "company-02",
    "alt": "型錄知識與真人客服",
    "src": "/case-icons/v1/company-02.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "company-03",
    "alt": "客服標準流程與培訓",
    "src": "/case-icons/v1/company-03.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "company-04",
    "alt": "人才標準與跨部門協作",
    "src": "/case-icons/v1/company-04.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "company-05",
    "alt": "永續供應鏈資料作業",
    "src": "/case-icons/v1/company-05.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "company-06",
    "alt": "生涯學習AI知識服務",
    "src": "/case-icons/v1/company-06.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "company-07",
    "alt": "建築諮詢與案件承接",
    "src": "/case-icons/v1/company-07.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "company-08",
    "alt": "客戶中心數據管理",
    "src": "/case-icons/v1/company-08.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-01",
    "alt": "健康科技電商服務旅程",
    "src": "/case-icons/v1/experience-01.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-02",
    "alt": "軟體服務與銷售協作",
    "src": "/case-icons/v1/experience-02.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-03",
    "alt": "智慧交通多通路客服",
    "src": "/case-icons/v1/experience-03.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-04",
    "alt": "健康科技敏捷與UX協作",
    "src": "/case-icons/v1/experience-04.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-05",
    "alt": "通路活動與客服銜接",
    "src": "/case-icons/v1/experience-05.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-06",
    "alt": "軟體客服遷移專案",
    "src": "/case-icons/v1/experience-06.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-07",
    "alt": "通訊品牌數位支援",
    "src": "/case-icons/v1/experience-07.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-08",
    "alt": "消費電子服務治理",
    "src": "/case-icons/v1/experience-08.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-09",
    "alt": "製造MES與BI資料模型",
    "src": "/case-icons/v1/experience-09.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-10",
    "alt": "自行車製造專案管理",
    "src": "/case-icons/v1/experience-10.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-11",
    "alt": "藥局零售ERP專案",
    "src": "/case-icons/v1/experience-11.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-12",
    "alt": "健身會員CRM與點數查詢",
    "src": "/case-icons/v1/experience-12.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-13",
    "alt": "健身服務BI管理分析",
    "src": "/case-icons/v1/experience-13.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-14",
    "alt": "客服中心搬遷與資訊設施",
    "src": "/case-icons/v1/experience-14.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-15",
    "alt": "跨職能Web ERP整合",
    "src": "/case-icons/v1/experience-15.webp",
    "width": 640,
    "height": 320
  },
  {
    "id": "experience-16",
    "alt": "線上內容商務與讀者點數",
    "src": "/case-icons/v1/experience-16.webp",
    "width": 640,
    "height": 320
  }
] as const;

export function caseIllustration(id: unknown) {
  return typeof id === "string" ? caseIllustrations.find(item => item.id === id) : undefined;
}
