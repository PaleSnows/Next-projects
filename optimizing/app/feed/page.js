import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

// data object porp received auto which will hold useful info
export async function generateMetadata(){
const post = await getPosts()
const numberOfPosts = post.length
return {
  title:`Browse all our ${numberOfPosts} posts`,
  description:"Browse all our posts"
}
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
