import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import homeStyles from '../../styles/home.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'

export const Post = ({ postData }: {
  postData: {
    title: string,
    date: string,
    contentHtml: string
  }
}) => {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={homeStyles.headingXl}>
          {postData.title}
        </h1>
        <div>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  
  // [{params: {id: 'pre-rendering} ... }]
  return {
    paths,
    // 에러나면 404로
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)

  return {
    props:
      postData
  }
}