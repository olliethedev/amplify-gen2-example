
import React, { use, useEffect } from 'react'
import { fetchBlogs } from '../utils/api'

const BlogCollection = async () => {
  const blogs = await fetchBlogs();
  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs && blogs.map((blog) => (
          <li key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogCollection;