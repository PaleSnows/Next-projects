"use client"
import { DUMMY_NEWS } from "@/dummy-news";
import { notFound, useRouter } from "next/navigation";
import React from "react";

const InterceptedImagePage = ({ params }) => {
  const router=useRouter()
  
  const newsItemSlug = params.slug;
  const newsItem = DUMMY_NEWS.find(
    (newsItem) => newsItem.slug === newsItemSlug
  );

  if (!newsItem) {
    notFound();
  }

   
  return (
    <>
    {/*back() when we want to execute back method, back when we want to point to back method  */}
      <div className="modal-backdrop" onClick={router.back} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
};

export default InterceptedImagePage;
