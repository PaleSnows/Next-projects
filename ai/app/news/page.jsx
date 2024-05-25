import Link from "next/link";

const NewsPage = () => {
  return (
    <>
      <h1>News Page</h1>
      <ul>
        <li>
          <Link href={"/news/first-news"}>First News Item</Link>
          <Link href={"/news/second-news"}>Second News Item</Link>
          <Link href={"/news/third-news"}>Third News Item</Link>
        </li>
      </ul>
    </>
  );
};

export default NewsPage;
