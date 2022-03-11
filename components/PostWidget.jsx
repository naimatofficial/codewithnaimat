import moment from 'moment'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Categories from './Categories'
import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      )
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result))
    }
  })

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg ">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="mb-4 flex w-full items-center py-2">
          <div className="w-16 flex-none">
            <Link href={`/post/${post.slug}`}>
              <img
                src={post.featuredImage.url}
                alt={post.title}
                height="100"
                width="100"
                className="h-14 w-14 cursor-pointer rounded-full border-2 border-cyan-300 object-cover"
              />
            </Link>
          </div>
          <div className="felx-grow ml-3 hover:text-gray-700">
            <p className="font-xs text-gray-500">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} key={post.title}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
