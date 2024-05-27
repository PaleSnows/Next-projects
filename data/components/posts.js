"use client";
import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { tooglePostLikeStatus } from "@/actions/posts";
import { useOptimistic } from "react";

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            {/* whenever likebutton is pressed toggleLikeStauts wwill be trigerred */}
            <form
              // bind method called as togglLikeStatus needs post.id and to pass post.id bind does the job, bind defines some value that will be passed to the function in the future when its executed,
              //  first arg defines this context, second arg passed will become new first arg when the funct is executed in the future
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    // first arg is data with which we start aka data fetched from db,a function called auto by react that updates posts optimistically
    posts,
    // function that updates post array optimistically
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId
      );
      if (updatedPostIndex === -1) {
        return prevPosts;
      }
      // updating post
      // Creates a copy of the post to be updated. This is done to maintain immutability.
      // prevPosts is an array, and prevPosts[updatedPostIndex] accesses the element at the updatedPostIndex position within that array.
      // updatedPostIndex: An integer representing the index of the post to be updated within the prevPosts array.
      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      // newPosts: Creates a new array by spreading the previous posts array.
      const newPosts = [...prevPosts];
      // Replaces the updated post in the new array.
      //  updatedPost;: Updates the element at updatedPostIndex in the newPosts array with the updatedPost object.
      newPosts[updatedPostIndex] = updatedPost;
      // Returns the new array, which will update the state in the useOptimistic hook.
      return newPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatedPost(postId) {
    updateOptimisticPosts(postId);
    await tooglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatedPost} />
        </li>
      ))}
    </ul>
  );
}
