/** Public organizational information checked against named primary sources on 2026-10-29.
 * Relationship labels remain in their original datasets; official descriptions do not establish completed projects.
 */
export type OrganizationProfile={id:string;displayName:string;fullName:string;industry:string;intro:string;services:readonly string[];website?:string;sourceUrl:string;sourceLabel:string;checkedAt:string;logoStatus:'official-source'|'not-confirmed';logo?:{src:string;alt:string;sourcePage:string;assetUrl:string;sha256:string};pendingReason?:string;identityNote?:string;extraSource?:string};
export const organizationProfiles:readonly OrganizationProfile[]=[
  {
    "id": "rockyboost",
    "displayName": "RockyBoost｜樂勤悟實國際有限公司",
    "fullName": "樂勤悟實國際有限公司",
    "industry": "企業培訓與組織發展",
    "intro": "RockyBoost 以溝通、改變與學習成長為核心，提供主管角色轉換、影響力表達與團隊溝通等培訓及教練服務。",
    "services": [
      "高效溝通與表達",
      "主管培育",
      "跨部門協作"
    ],
    "website": "https://www.rockyboost.com/",
    "sourceUrl": "https://www.rockyboost.com/",
    "sourceLabel": "官方品牌網站",
    "identityNote": "公司關聯依既有核可合作資料；網路查核品牌及專業介紹。",
    "checkedAt": "2026-10-29",
    "logo": {
      "src": "/organization-logos/rockyboost.png",
      "alt": "RockyBoost｜樂勤悟實國際有限公司官方Logo",
      "sourcePage": "https://www.rockyboost.com/",
      "assetUrl": "https://d1yei2z3i6k35z.cloudfront.net/9664059/6963027de6745_n火箭Logo_FA5_方形無文字.PNG",
      "sha256": "7a1d7de6e5d92a81cfd0c00eabcaa5950c93797a2148f45120b60092bdd45a3a"
    },
    "logoStatus": "official-source"
  },
  {
    "id": "corporate-trainers",
    "displayName": "企業講師聯誼會",
    "fullName": "企業講師聯誼會 Professional Trainers Alliance",
    "industry": "講師與知識工作者社群",
    "intro": "連結講師、人資、訓練工作者與學習夥伴，透過知識共學、專業交流與資源分享，支持持續學習與教學成長。",
    "services": [
      "講師交流",
      "學習活動",
      "專業資源分享"
    ],
    "website": "https://www.protrainers.org/",
    "sourceUrl": "https://www.protrainers.org/about/",
    "sourceLabel": "官方組織介紹",
    "checkedAt": "2026-10-29",
    "logo": {
      "src": "/organization-logos/corporate-trainers.jpg",
      "alt": "企業講師聯誼會官方Logo",
      "sourcePage": "https://www.protrainers.org/about/",
      "assetUrl": "https://storage.ghost.io/c/9c/e2/9ce25572-72b0-4557-acb8-95f25edaee98/content/images/2025/12/IMG_5371.JPG",
      "sha256": "57644b5fb0fe0f9fb765ca1fe0412239d41b99810a99972325b06cedda89e473"
    },
    "logoStatus": "official-source"
  },
  {
    "id": "for-you",
    "displayName": "富由產業學院媒合平台",
    "fullName": "For You 富由產業學院媒合平台",
    "industry": "企業經營診斷與顧問媒合",
    "intro": "整合實務管理與顧問資源，透過需求訪談、經營診斷及輔導，協助企業釐清營運、管理、人資與財務等經營課題。",
    "services": [
      "經營診斷",
      "顧問資源媒合",
      "人才培訓"
    ],
    "website": "https://www.for-you-training-service.net/",
    "sourceUrl": "https://www.for-you-training-service.net/關於富由-for-you",
    "sourceLabel": "官方平台介紹",
    "checkedAt": "2026-10-29",
    "logo": {
      "src": "/organization-logos/for-you.jpg",
      "alt": "富由產業學院媒合平台官方Logo",
      "sourcePage": "https://www.for-you-training-service.net/",
      "assetUrl": "https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72tOBkzh0Dr57c8VQ-tWFBpymu-n26KH5b4fFFj1nAKx-J3fewpxjMXLfz1hXN2tppySy97K5x93IeuVc2JDeZ0FqhOqeNfapwbErBNrlT5BjTPBfgR7KaWfmiJJBUNQmfZu7MheYu6aFgQ5m3W7T0dyyFFwAdjXe4SV_eMuxigoG9tUP0r3sb5fth_t=w16383",
      "sha256": "e8196e9e64949d40b5faea13a313a24c8827b3a0ac465ab9be75b84605adc877"
    },
    "logoStatus": "official-source"
  },
  {
    "id": "unity",
    "displayName": "優樂地永續服務股份有限公司",
    "fullName": "優樂地永續服務股份有限公司",
    "industry": "企業永續顧問與培力",
    "intro": "提供永續策略與認證輔導、永續培力、客製化專案與共創平台，結合跨域合作及創新設計支持企業永續發展。",
    "services": [
      "永續策略與認證",
      "永續工作坊",
      "客製化專案"
    ],
    "website": "https://www.unitygood.com/",
    "sourceUrl": "https://www.unitygood.com/",
    "sourceLabel": "官方企業網站",
    "checkedAt": "2026-10-29",
    "logo": {
      "src": "/organization-logos/unity.png",
      "alt": "優樂地永續服務股份有限公司官方Logo",
      "sourcePage": "https://www.unitygood.com/",
      "assetUrl": "https://static.wixstatic.com/media/0b0a05_6250588d84c042d1b06153de000e4f50~mv2.png",
      "sha256": "e99b9cfdc62d3085256c986dabab58e0bb9d0895bf87cf1dfbd4677f14f1983e"
    },
    "logoStatus": "official-source"
  },
  {
    "id": "wanin",
    "displayName": "網銀國際股份有限公司",
    "fullName": "網銀國際股份有限公司｜WANIN",
    "industry": "遊戲與數位娛樂",
    "intro": "以遊戲為核心發展數位娛樂事業，涵蓋遊戲研發與營運、應用程式、電競及影視等領域，串聯多元娛樂服務。",
    "services": [
      "遊戲研發與營運",
      "數位娛樂",
      "電競與影視"
    ],
    "website": "https://www.wanin.tw/",
    "sourceUrl": "https://www.wanin.tw/About/",
    "sourceLabel": "官方企業簡介",
    "checkedAt": "2026-10-29",
    "logo": {
      "src": "/organization-logos/wanin.svg",
      "alt": "網銀國際股份有限公司官方Logo",
      "sourcePage": "https://www.wanin.tw/About/",
      "assetUrl": "https://www.wanin.tw/assets/images/logo_new.svg",
      "sha256": "6846854d5f2d20e5e1176fbda30ea3071e72d6f9a4d7248f8b97af5379e8a582"
    },
    "logoStatus": "official-source"
  },
  {
    "id": "haitu",
    "displayName": "海途教育發展企業社",
    "fullName": "海途教育發展企業社",
    "industry": "顧問與教育交流",
    "intro": "公開登記項目包含管理顧問、其他顧問及翻譯服務；與韓森的交流面向依既有合作備忘錄呈現。",
    "services": [
      "管理顧問登記項目",
      "專業顧問登記項目",
      "翻譯登記項目"
    ],
    "sourceUrl": "https://serv.gcis.nat.gov.tw/moeadsBF/cmpy/reportAction.do?fileName=376610000Asetup11402.pdf&method=report&reportClass=bmsItem&subPath=11402",
    "sourceLabel": "經濟部公開登記資料",
    "pendingReason": "尚未找到可確認歸屬的官方網站及Logo，不借用香港生涯規劃協會或LDI標誌。",
    "checkedAt": "2026-10-29",
    "logoStatus": "not-confirmed"
  },
  {
    "id": "ldi",
    "displayName": "生涯發展學院 LDI",
    "fullName": "生涯發展學院 Life Development Institute",
    "industry": "生涯教育與專業培訓",
    "intro": "專注生涯發展教育，提供專業培訓、企業工作坊與生涯諮詢，連結個人成長、職涯探索與專業人才培育。",
    "services": [
      "生涯發展專業培訓",
      "企業工作坊",
      "生涯諮詢"
    ],
    "website": "https://www.ldihk.org/",
    "sourceUrl": "https://www.ldihk.org/",
    "sourceLabel": "官方學院網站",
    "checkedAt": "2026-10-29",
    "logo": {
      "src": "/organization-logos/ldi.png",
      "alt": "生涯發展學院 LDI官方Logo",
      "sourcePage": "https://www.ldihk.org/",
      "assetUrl": "https://www.ldihk.org/wp-content/uploads/2025/03/LOGO-NEW-10-e1744956894107.png",
      "sha256": "72594498507342c5ff1b52b79279ef4a52bf65c7d1c49f4795980210c9e526aa"
    },
    "logoStatus": "official-source"
  },
  {
    "id": "noah",
    "displayName": "諾亞未來人才教育學會",
    "fullName": "諾亞未來人才教育學會",
    "industry": "永續教育與未來人才",
    "intro": "結合學術、產業與國際合作資源，推動生涯輔導、綠色職業素養與社會實踐，連結教育與職業發展。",
    "services": [
      "未來人才教育",
      "永續素養",
      "生涯與社會實踐"
    ],
    "website": "https://www.noahedu.org/",
    "sourceUrl": "https://www.noahedu.org/",
    "sourceLabel": "官方學會網站",
    "checkedAt": "2026-10-29",
    "logo": {
      "src": "/organization-logos/noah.png",
      "alt": "諾亞未來人才教育學會官方Logo",
      "sourcePage": "https://www.noahedu.org/",
      "assetUrl": "https://www.noahedu.org/wp-content/uploads/2024/05/logo.png",
      "sha256": "091a18e7a5821a5036eda6e1c46089885dad47edc6657a5ae4d6977935a7807d"
    },
    "logoStatus": "official-source"
  },
  {
    "id": "xunyue",
    "displayName": "旬玥老師｜形象穿搭專業",
    "fullName": "李旬玥｜形象穿搭專業",
    "industry": "專業形象與穿搭教學",
    "intro": "以專業形象與穿搭為教學主題，從場合、身分與個人特質出發，連結外在形象、影響力與專業表達。",
    "services": [
      "專業形象",
      "穿搭表達",
      "講師個人辨識度"
    ],
    "sourceUrl": "https://www.protrainers.org/boost-your-influence-through-your-outfits/",
    "sourceLabel": "主辦單位公開講師介紹",
    "pendingReason": "已找到主辦單位講師介紹；本人官方網站、品牌Logo與工作室對應仍待確認。",
    "checkedAt": "2026-10-29",
    "logoStatus": "not-confirmed"
  },
  {
    "id": "xinghong",
    "displayName": "信閎聯合會計師事務所",
    "fullName": "信閎聯合會計師事務所",
    "industry": "會計、稅務與企業管理顧問",
    "intro": "為中小企業提供會計帳務、工商登記、簽證及企業管理等服務，並結合跨專業顧問資源回應企業經營需求。",
    "services": [
      "會計帳務與稅務",
      "工商登記及簽證",
      "企業管理諮詢"
    ],
    "website": "https://www.xinghocpa.com/website/index.html",
    "sourceUrl": "https://www.xinghocpa.com/website/index.html",
    "sourceLabel": "官方事務所網站",
    "checkedAt": "2026-10-29",
    "logo": {
      "src": "/organization-logos/xinghong.png",
      "alt": "信閎聯合會計師事務所官方Logo",
      "sourcePage": "https://www.xinghocpa.com/website/index.html",
      "assetUrl": "https://www.xinghocpa.com/website/assets/images/logo.png",
      "sha256": "7376ca17f1b5eca809585ec1177d5365c0f38b7ac09a2bf03192e1446d553a9b"
    },
    "logoStatus": "official-source"
  },
  {
    "id": "earsun",
    "displayName": "易而善 Earsun",
    "fullName": "易而善國際事業有限公司",
    "industry": "營養食品與健康補給",
    "intro": "以家庭營養補給為品牌方向，提供奶粉、蛋白質與機能營養等產品，服務不同年齡及日常營養需求。",
    "services": [
      "奶粉與蛋白質營養",
      "日常營養補給",
      "家庭營養產品"
    ],
    "website": "https://www.earsun888.com/",
    "sourceUrl": "https://www.earsun888.com/pages/aboutearsun-2",
    "sourceLabel": "官方品牌故事",
    "extraSource": "https://www.earsun888.com/pages/trademark-change-announcement-1",
    "checkedAt": "2026-10-29",
    "logo": {
      "src": "/organization-logos/earsun.webp",
      "alt": "易而善 Earsun官方Logo",
      "sourcePage": "https://www.earsun888.com/pages/trademark-change-announcement-1",
      "assetUrl": "https://shoplineimg.com/5b29f3830e64fe29db002a41/67d2821594a813000f620d93/306x.webp?source_format=png",
      "sha256": "2900fa6fd4e6afefec4bf1f89c1d2d078cd0d092f2c3cbee608130caaf8631f3"
    },
    "logoStatus": "official-source"
  },
  {
    "id": "idea-film",
    "displayName": "點子．包裝（點子封膜）",
    "fullName": "譯加實業股份有限公司",
    "industry": "封口膜與包裝整合",
    "intro": "以點子．包裝品牌提供封口膜與軟性包材等服務，結合包裝設計、製版印刷及生產整合，服務飲料與餐飲品牌。",
    "services": [
      "封口膜",
      "軟性包材",
      "包裝設計與印刷"
    ],
    "website": "https://ideafilm.com.tw/",
    "sourceUrl": "https://ideafilm.com.tw/",
    "sourceLabel": "官方品牌與公司資訊",
    "checkedAt": "2026-10-29",
    "logo": {
      "src": "/organization-logos/idea-film.png",
      "alt": "點子．包裝（點子封膜）官方Logo",
      "sourcePage": "https://ideafilm.com.tw/",
      "assetUrl": "https://ideafilm.com.tw/wp-content/uploads/2025/12/cropped-cropped-cropped-20251226-點子包裝-官網LOGO-180x60px-2-150dpi_0.png",
      "sha256": "d55c91f1ded5f818218ec72cbdc99847d545b5bf3ed0c784fda23949a9753b04"
    },
    "logoStatus": "official-source"
  }
] as const;
export function organizationProfile(id:string){return organizationProfiles.find(profile=>profile.id===id);}
export function organizationSearchText(id:string){const p=organizationProfile(id);return p?[p.displayName,p.fullName,p.industry,p.intro,...p.services].join(' '):'';}
