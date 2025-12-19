// 在 App.jsx 頂部添加 import
import podcastData from './podcast_episodes.json';

// Podcast 區塊 - 使用 RSS Feed 資料
<section id="podcast" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
        <Play className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-4xl font-bold text-gray-900 mb-4">企業解憂事務所 Podcast</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        由 Hanson 數位管理顧問團隊主持，每集用最生活化的故事，分享企業真實痛點與職涯領導力解方
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Badge className="bg-blue-600 text-white px-4 py-2 text-sm">{podcastData.total} 集數</Badge>
        <Badge className="bg-purple-600 text-white px-4 py-2 text-sm">企業管理</Badge>
        <Badge className="bg-green-600 text-white px-4 py-2 text-sm">職涯發展</Badge>
        <Badge className="bg-orange-600 text-white px-4 py-2 text-sm">AI 應用</Badge>
      </div>
    </div>

    {/* 最新集數 - 使用 RSS 資料 */}
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">最新集數</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcastData.episodes.slice(0, 6).map((episode, index) => {
          // 定義不同的漸層色彩
          const gradients = [
            'from-blue-500 to-purple-600',
            'from-green-500 to-blue-600',
            'from-orange-500 to-red-600',
            'from-pink-500 to-purple-600',
            'from-indigo-500 to-blue-600',
            'from-teal-500 to-green-600'
          ];
          
          // 定義分類標籤顏色
          const badgeColors = [
            'bg-blue-100 text-blue-800',
            'bg-green-100 text-green-800',
            'bg-orange-100 text-orange-800',
            'bg-pink-100 text-pink-800',
            'bg-indigo-100 text-indigo-800',
            'bg-teal-100 text-teal-800'
          ];

          return (
            <a
              key={index}
              href={episode.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-lg flex items-center justify-center`}>
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      {episode.number && (
                        <Badge className={`${badgeColors[index % badgeColors.length]} mb-2`}>
                          {episode.number}
                        </Badge>
                      )}
                      <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {episode.title}
                      </h4>
                      {episode.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {episode.description}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-500">
                        {episode.date && <span>{episode.date}</span>}
                        {episode.date && episode.duration && <span className="mx-2">•</span>}
                        {episode.duration && <span>{episode.duration}</span>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>
    </div>

    {/* 多平台連結 */}
    <div className="text-center">
      <h3 className="text-xl font-bold text-gray-900 mb-6">在您喜歡的平台收聽</h3>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <a 
          href="https://open.spotify.com/show/your-show-id" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Spotify
        </a>
        <a 
          href="https://podcasts.apple.com/podcast/your-podcast-id" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zm0-16.8c-3.978 0-7.2 3.222-7.2 7.2s3.222 7.2 7.2 7.2 7.2-3.222 7.2-7.2-3.222-7.2-7.2-7.2zm0 12c-2.651 0-4.8-2.149-4.8-4.8s2.149-4.8 4.8-4.8 4.8 2.149 4.8 4.8-2.149 4.8-4.8 4.8zm0-7.2c-1.325 0-2.4 1.075-2.4 2.4s1.075 2.4 2.4 2.4 2.4-1.075 2.4-2.4-1.075-2.4-2.4-2.4z"/>
          </svg>
          Apple Podcasts
        </a>
        <a 
          href="https://www.youtube.com/@BSCS-HJ" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          YouTube
        </a>
        <a 
          href="https://biznutrify543.firstory.io/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          查看所有集數
        </a>
      </div>
    </div>
  </div>
</section>
