import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = async (_context) => {
  // fetch list of persons
  
  return {
    props: {
      data: [],
    },
  }
}

const IndexPage: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Home page</title>
      </Head>

      <h1>Linked Art Exhibition Browser</h1>

      <section>
        <p>Person Index</p>
       <Link href="./persons">Explore persons</Link>
      </section>

      <section>
        <p>Exhibition Index</p>
       <Link href="./exhibitions">Explore exhibitions</Link>
      </section>
    </main>
  )
}

export default IndexPage
