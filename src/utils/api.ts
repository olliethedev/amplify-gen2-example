'use server'
import { serverClient } from "./server-client"

export const fetchBlogs = async () => {
  const { data: blogs, errors } = await serverClient.models.Blog.list()

  if (!errors) {
    return blogs
  }
}

export const fetchBlog = async (id: string) => {
  const { data: blog, errors } = await serverClient.models.Blog.get({ id })

  if (!errors) {
    return blog
  }
}

export async function createBlogFromForm(formData: FormData) {
  const { title, tags, content } = Object.fromEntries(formData.entries()) as { title: string, tags: string, content: string };
  await createBlog(title, content, tags.split(', '));
}

export const createBlog = async (title: string, content: string, tags: string[]) => {
  const { data: blog, errors } = await serverClient.models.Blog.create({
    title,
    content
  }, { authMode: 'userPool' });

  for (const tag of tags) {
    const { data: tagData, errors: tagErrors } = await serverClient.models.Tag.create({
      name: tag
    }, { authMode: 'userPool' });

    if (!tagErrors) {
      const { data: blogTag, errors: blogTagErrors } = await serverClient.models.BlogTags.create({
        blogId: blog.id,
        tagId: tagData.id
      }, { authMode: 'userPool' });
    }
  }
  if (!errors) {
    return blog
  }
}

export async function createCommentFromForm(formData: FormData, blogId: string) {
  const { content } = Object.fromEntries(formData.entries()) as { content: string };
  await createComment(content, blogId);
}

export const createComment = async (content: string, blogId: string) => {
  const { data: comment, errors } = await serverClient.models.Comment.create({
    content,
    blogCommentsId: blogId
  }, { authMode: 'userPool' });
  if (!errors) {
    return comment
  }
}

