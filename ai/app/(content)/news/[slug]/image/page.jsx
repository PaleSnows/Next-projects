import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";
import React from "react";

const ImagePage = async ({ params }) => {
  const newsItemSlug = params.slug;
  const newsItem = await getNewsItem(newsItemSlug);

  if (!newsItem) {
    notFound();
  }
  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
};

export default ImagePage;
