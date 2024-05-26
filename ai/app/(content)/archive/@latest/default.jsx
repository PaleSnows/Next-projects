import NewsList from '@/components/news-list'
import { getLatestNews } from '@/lib/news'
import React from 'react'

const LatestNews = async() => {
    const latestNews = await getLatestNews()
  return (
    <>
    <h2>LatestNewsPage</h2>
    <NewsList news={latestNews}/>
    </>
  )
}

export default LatestNews