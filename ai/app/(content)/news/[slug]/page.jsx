import { getNewsItem } from "@/lib/news";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const NewsDetail = async({ params }) => {
  //getting url path via params.fileName
  const newsSlug = params.slug;
  const newsItem =await getNewsItem(newsSlug)

  if (!newsItem) {
    // special function which calls notfound page content
    notFound();
  }
  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
};

export default NewsDetail;
