import React from "react";
import { fetchBlogs } from "../utils/api";
import Link from "next/link";

const BlogCollection = async () => {
  const blogs = await fetchBlogs();
  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs &&
          blogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                <h2>{blog.title}</h2>
              </Link>
              <p>{blog.content}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BlogCollection;
