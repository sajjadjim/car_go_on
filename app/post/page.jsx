import Link from 'next/link';
import React from 'react'

const getPost = async ()=>{
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    return data;
}

export const metadata=()=>{
    return {
        title: 'Posts',
        description: 'List of all posts'
    }
}


export default async function Posts() {
    const postsAll = await getPost()
  return (
    <div className='mx-5 my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {postsAll.map(post => (
        <div className='border p-3 my-2 rounded-xl' key={post.id}>
            <p>Id :{post.id}</p>
          <h2  className='border-1 p-1 rounded-md'>Title :{post.title}</h2>
          <p>Text :{post.body}</p>
          <Link href={`/post/${post.id}`} className='text-blue-500  border-1  p-1 rounded-md my-5'>Details</Link>
        </div>
      ))}
    </div>
  )
}
