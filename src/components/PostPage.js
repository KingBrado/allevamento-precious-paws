import React from 'react'
import { useParams } from 'react-router'
import Post from './Post';

export default function PostPage() {
    const { postId } = useParams();
  return (
    <>
      <Post postId={postId} />
    </>
  )
}
