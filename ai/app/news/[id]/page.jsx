import React from "react";

const NewsDetail = ({ params }) => {
  //getting url path via params.id
  const newsId = params.id;
  return (
    <>
      <h1>News Detail Page</h1>
      <p>News Id: {newsId}</p>
    </>
  );
};

export default NewsDetail;
