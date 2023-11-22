import { createCommentFromForm, fetchBlog } from '@/src/utils/api';
import React from 'react'

const BlogPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const blog = await fetchBlog(slug);
  const blogTags = await blog?.tags();
  const tags = (await Promise.all((blogTags?.data || []).map((tag) => tag.tag()))).map((tag) => tag.data);
  const comments = (await blog?.comments())?.data;

  return (
    <div>
      <h1>{blog?.title}</h1>
      {/* tags */}
      <p>{tags?.map((tag) => (
        <span key={tag?.id}>{tag?.name}</span>
      ))}</p>
      {/* content */}
      <p>{blog?.content}</p>
      {/* comments */}
      {comments && comments.map((comment) => (
        <div key={comment.id}>
          <h3>{comment.content}</h3>
          <p>{comment.createdAt}</p>
        </div>
          ))}
      {/* add comment */}
      <form action={async (e)=>{
        'use server'
        await createCommentFromForm(e, blog?.id??"")
        }}>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" />
        <button type="submit">Add Comment</button>
      </form>
      </div>
  )
}

export default BlogPage