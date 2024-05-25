import Link from "next/link"

const NewsPage = () => {
  return (
    <div>
        <h1>News Page</h1>
        <Link href={'/NewsDetail'}>First News Item</Link>
        <Link href={''}>Second News Item</Link>
        <Link href={''}>Third News Item</Link>
    </div>
  )
}

export default NewsPage