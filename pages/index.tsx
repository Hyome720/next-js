import Head from 'next/head'
import homeStyles from '../styles/Home.module.css'
import { GetStaticProps } from 'next'
import { getSortedPostsData } from '../lib/posts'
import { Link } from 'react-router-dom'


const Home = ({ allPostsData }: {
  allPostsData: {
    date: string,
    title: string,
    id: string
  }[]
}) => {
  return (
    <div>
      <Head>
        <title>Hyormone</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Hyormone Introduction]</p>
        <p>
          (이건 웹사이트다)
        </p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>블로그</h2>
        <ul className={homeStyles.list}>
          {allPostsData.map(({ id, date, title }) => 
            <li className={homeStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={homeStyles.lightText}>
                {date}
              </small>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  
  return {
    props: {
      allPostsData
    }
  }
}