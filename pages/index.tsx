import type { NextPage } from 'next'
import Head from 'next/head'
import { PostCard, PostWidget, Categories } from '../components/'

import { getPosts } from '../services/index'
import { FeaturedPosts } from '../sections'

export default function Home({ posts }) {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>codewithnaimat | Learn new technologies </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-10">
        <FeaturedPosts />
      </div>
      <div className="grid grid-cols-1 gap-12 px-10 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget categories={undefined} slug={undefined} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  return {
    props: { posts },
  }
}
