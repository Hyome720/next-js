import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import homeStyles from '../../styles/home.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'
import {withRouter} from "next/router";

const Post = (router: any) => {
  console.log(router)

  return (
    <div>
      <Head>
        <title>{router.title}</title>
      </Head>
      <article>
        <h1 className={homeStyles.headingXl}>
          {router.title}
        </h1>
        <div>
          {router.date}
        </div>
        <div dangerouslySetInnerHTML={{ __html: router.contentHtml }} />
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

export default Post;
