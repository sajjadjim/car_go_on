import React from 'react'


export default async function SinglePost({params}) {
    const p = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    const post = await p.json();
  return (
    <div>
      <h1>Post Details</h1>
      <p>Post ID: {params.id}</p>
      <p>Post Title: {post.title}</p>
      <p>Post Body: {post.body}</p>
    </div>
  )
}
