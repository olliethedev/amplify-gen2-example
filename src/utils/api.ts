'use server'
import { serverClient } from "./server-client"
import { Amplify } from 'aws-amplify';
// import amplifyconfig from '@/amplifyconfiguration.json';

// Amplify.configure(amplifyconfig);

export const fetchBlogs = async () => {
  const { data: blogs, errors } = await serverClient.models.Blog.list()

  if (!errors) {
    return blogs
  }
}

export async function createBlogFromForm(formData: FormData) {
  'use server'
  console.log(Amplify.getConfig())
  console.log('formData', formData);
  const { title, tags, content } = Object.fromEntries(formData.entries()) as { title: string, tags: string, content: string};
  await createBlog(title,  content, tags.split(', '));
}

export const createBlog = async (title: string, content: string, tags: string[]) => {
  const { data: blog, errors } = await serverClient.models.Blog.create({
    title,
    content
  },{authMode: 'userPool'});
  console.log({ blog, errors });
  for (const tag of tags) {
    const { data: tagData, errors: tagErrors } = await serverClient.models.Tag.create({
      name: tag
    });
    console.log({ tagData });
    if (!tagErrors) {
      const { data: blogTag, errors: blogTagErrors } = await serverClient.models.BlogTags.create({
        blogId: blog.id,
        tagId: tagData.id
      },{authMode: 'userPool'});
      console.log({ blogTag, blogTagErrors });
    }
  }
  if (!errors) {
    return blog
  }
}

export const createComment = async (content: string, blogId: string) => {
  const { data: comment, errors } = await serverClient.models.Comment.create({
    content,
    blogCommentsId: blogId
  });
  console.log({ comment, errors });
  if (!errors) {
    return comment
  }
}

