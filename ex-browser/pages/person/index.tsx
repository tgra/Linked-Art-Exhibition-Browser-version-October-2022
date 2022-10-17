import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'
import Person from '../../components/person'

import { PersonData, PersonDataListProps} from '../../types/persondata'
import { GetPersons } from '../../lib/persondata_api'


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
        <title>Person index</title>
      </Head>

      <h1>Person index</h1>

      <section>
        {personDataList.map((person: PersonData) => (
          <Person {...person} key={person.id} />
        ))}
      </section>
    </main>
  )
}

export default IndexPage
