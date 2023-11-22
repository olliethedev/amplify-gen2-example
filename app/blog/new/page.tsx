'use client'
import React from 'react'
import {  createBlogFromForm } from '@/src/utils/api'
import { withAuthenticator } from "@aws-amplify/ui-react"
import { Amplify } from 'aws-amplify';
import amplifyconfig from '@/amplifyconfiguration.json';

Amplify.configure(amplifyconfig);


const NewBlog = () => {

  return (
    <form action={createBlogFromForm} method="post">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" />
        {/* tags */}
        <label htmlFor="tags">Tags</label>
        <input id="tags" name="tags" type="text" />
        {/* content */}
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" />
        <button type="submit">Create</button>
    </form>
  )
}

export default withAuthenticator(NewBlog)