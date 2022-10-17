import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, NextPage } from 'next'
import Person from '../components/person'
import { PersonData, PersonDataListProps } from '../types/persondata'
import { GetPersons } from '../lib/persondata_api'

export const getStaticProps: GetStaticProps = async (_context) => {
  // fetch list of persons
  const persons: PersonData[] = await GetPersons()
  return {
    props: {
      personDataList: persons,
    },
  }
}

const IndexPage: NextPage<PersonDataListProps> = ({
  personDataList,
}: PersonDataListProps) => {
  return (
    <main>
      <Head>
        <title>Home page</title>
      </Head>

      <h1>Linked Art Exhibition Browser</h1>

      <section>
        <p>Person Index</p>
       <Link href="person">Explore persons</Link>
      </section>

      <section>
        <p>Exhibition Index</p>
       <Link href="exhibition">Explore exhibitions</Link>
      </section>
    </main>
  )
}

export default IndexPage
