import NewsList from '@/components/news-list'
import { getLatestNews } from '@/lib/news'
import React from 'react'

const LatestNews = () => {
    const latestNews = getLatestNews()
  return (
    <>
    <h2>LatestNewsPage</h2>
    <NewsList news={latestNews}/>
    </>
  )
}

export default LatestNews