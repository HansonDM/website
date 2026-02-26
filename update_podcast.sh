#!/bin/bash

# Podcast RSS Feed 自動更新腳本
# 此腳本會從 Firstory RSS Feed 抓取最新集數並更新網站

set -e  # 遇到錯誤立即停止

# 設定顏色輸出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Podcast RSS Feed 自動更新腳本${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 切換到網站目錄
cd /home/ubuntu/website

# 1. 抓取 RSS Feed 並解析為 JSON
echo -e "${GREEN}[1/6] 正在從 Firstory RSS Feed 抓取最新集數...${NC}"

python3 << 'PYTHON_SCRIPT'
import xml.etree.ElementTree as ET
import requests
import json
from datetime import datetime

# RSS Feed URL
RSS_URL = "https://feed.firstory.me/rss/user/cld2k5uon026b01tj3x31cprb"

# 抓取 RSS Feed
response = requests.get(RSS_URL)
response.raise_for_status()

# 解析 XML
root = ET.fromstring(response.content)

# 提取集數資訊
episodes = []
for item in root.findall('.//item'):
    title = item.find('title').text if item.find('title') is not None else ""
    description = item.find('description').text if item.find('description') is not None else ""
    link = item.find('link').text if item.find('link') is not None else ""
    pub_date = item.find('pubDate').text if item.find('pubDate') is not None else ""
    
    # 解析發布日期
    try:
        date_obj = datetime.strptime(pub_date, '%a, %d %b %Y %H:%M:%S %z')
        date_str = date_obj.strftime('%Y-%m-%d')
    except:
        date_str = ""
    
    # 提取時長
    duration = ""
    itunes_duration = item.find('{http://www.itunes.com/dtds/podcast-1.0.dtd}duration')
    if itunes_duration is not None:
        duration_seconds = int(itunes_duration.text) if itunes_duration.text else 0
        minutes = duration_seconds // 60
        seconds = duration_seconds % 60
        duration = f"{minutes}:{seconds:02d}"
    
    # 提取圖片
    image = ""
    itunes_image = item.find('{http://www.itunes.com/dtds/podcast-1.0.dtd}image')
    if itunes_image is not None:
        image = itunes_image.get('href', '')
    
    # 提取集數編號（從標題中）
    number = ""
    if title.startswith("EP"):
        number = title.split()[0] if " " in title else title[:5]
    elif title.startswith("VP"):
        number = ""  # VP 系列不顯示編號
    
    episodes.append({
        "number": number,
        "title": title,
        "description": description,
        "link": link,
        "date": date_str,
        "duration": duration,
        "image": image
    })

# 建立 JSON 結構
podcast_data = {
    "total": len(episodes),
    "episodes": episodes
}

# 寫入 JSON 檔案
with open('src/podcast_episodes.json', 'w', encoding='utf-8') as f:
    json.dump(podcast_data, f, ensure_ascii=False, indent=2)

print(f"✓ 成功抓取 {len(episodes)} 集 Podcast")

PYTHON_SCRIPT

echo -e "${GREEN}✓ RSS Feed 抓取完成${NC}"
echo ""

# 2. 檢查是否有變更
echo -e "${GREEN}[2/6] 檢查是否有新集數...${NC}"

if git diff --quiet src/podcast_episodes.json; then
    echo -e "${BLUE}沒有新集數，無需更新${NC}"
    exit 0
else
    echo -e "${GREEN}✓ 發現新集數，準備更新網站${NC}"
fi
echo ""

# 3. 建置網站
echo -e "${GREEN}[3/6] 正在建置網站...${NC}"
npm run build
echo -e "${GREEN}✓ 網站建置完成${NC}"
echo ""

# 4. 提交變更
echo -e "${GREEN}[4/6] 正在提交變更到 Git...${NC}"
git add src/podcast_episodes.json dist/
COMMIT_MSG="Auto-update podcast episodes from RSS feed - $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG"
echo -e "${GREEN}✓ 變更已提交${NC}"
echo ""

# 5. 推送到 GitHub
echo -e "${GREEN}[5/6] 正在推送到 GitHub...${NC}"
git push origin main
echo -e "${GREEN}✓ 已推送到 GitHub${NC}"
echo ""

# 6. 完成
echo -e "${GREEN}[6/6] 自動更新完成！${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}GitHub Actions 將自動部署網站${NC}"
echo -e "${BLUE}預計 1-2 分鐘後網站將顯示最新集數${NC}"
echo -e "${BLUE}========================================${NC}"
