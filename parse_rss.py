#!/usr/bin/env python3
"""
解析 Firstory RSS Feed 並生成 JSON 格式的集數資料
"""

import xml.etree.ElementTree as ET
import json
import re
from datetime import datetime

def parse_rss(xml_file):
    """解析 RSS XML 檔案"""
    tree = ET.parse(xml_file)
    root = tree.getroot()
    
    # 找到 channel
    channel = root.find('channel')
    
    episodes = []
    
    # 遍歷所有 item (集數)
    for item in channel.findall('item'):
        # 提取標題
        title_elem = item.find('title')
        title = title_elem.text if title_elem is not None else ''
        
        # 提取描述
        desc_elem = item.find('description')
        description = desc_elem.text if desc_elem is not None else ''
        
        # 清理 HTML 標籤
        if description:
            description = re.sub(r'<[^>]+>', '', description)
            description = re.sub(r'\[CDATA\[|\]\]', '', description)
            description = description.strip()
            # 只取前 150 個字元
            if len(description) > 150:
                description = description[:147] + '...'
        
        # 提取連結
        link_elem = item.find('link')
        link = link_elem.text if link_elem is not None else ''
        
        # 提取發布日期
        pubdate_elem = item.find('pubDate')
        pubdate = pubdate_elem.text if pubdate_elem is not None else ''
        
        # 轉換日期格式
        formatted_date = ''
        if pubdate:
            try:
                dt = datetime.strptime(pubdate, '%a, %d %b %Y %H:%M:%S %Z')
                formatted_date = dt.strftime('%Y-%m-%d')
            except:
                formatted_date = pubdate
        
        # 提取時長
        duration_elem = item.find('{http://www.itunes.com/dtds/podcast-1.0.dtd}duration')
        duration = duration_elem.text if duration_elem is not None else '0'
        
        # 轉換時長為 mm:ss 格式
        formatted_duration = ''
        if duration and duration.isdigit():
            total_seconds = int(duration)
            minutes = total_seconds // 60
            seconds = total_seconds % 60
            formatted_duration = f"{minutes}:{seconds:02d}"
        
        # 提取圖片
        image_elem = item.find('{http://www.itunes.com/dtds/podcast-1.0.dtd}image')
        image = image_elem.get('href') if image_elem is not None else ''
        
        # 從標題中提取集數編號
        episode_number = ''
        ep_match = re.search(r'EP\s*(\d+)', title, re.IGNORECASE)
        if ep_match:
            episode_number = f"EP{ep_match.group(1)}"
        
        # 從標題中提取主題（移除集數編號後的內容）
        episode_title = re.sub(r'EP\s*\d+\s*[：:|\-]?\s*', '', title, flags=re.IGNORECASE)
        
        episodes.append({
            'number': episode_number,
            'title': episode_title,
            'description': description,
            'link': link,
            'date': formatted_date,
            'duration': formatted_duration,
            'image': image
        })
    
    return episodes

def main():
    # 解析 RSS
    episodes = parse_rss('/home/ubuntu/podcast_rss.xml')
    
    # 輸出為 JSON
    output = {
        'total': len(episodes),
        'episodes': episodes[:20]  # 只取前 20 集
    }
    
    with open('/home/ubuntu/website/src/podcast_episodes.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 成功解析 {len(episodes)} 集，已保存前 20 集到 podcast_episodes.json")
    print(f"\n最新 5 集：")
    for i, ep in enumerate(episodes[:5], 1):
        print(f"{i}. {ep['number']} - {ep['title'][:50]}...")

if __name__ == '__main__':
    main()
