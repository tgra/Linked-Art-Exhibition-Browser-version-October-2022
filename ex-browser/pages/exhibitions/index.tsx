import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'
import Ex from '../../components/ex'

import { ExData, ExDataListProps} from '../../types/exdata'
import { GetExs } from '../../lib/exdata_api'


export const getStaticProps: GetStaticProps = async (_context) => {
  // fetch list of exhibitions
  const exs: ExData[] = await GetExs()
  return {
    props: {
      exDataList: exs,
    },
  }
}

const IndexPage: NextPage<ExDataListProps> = ({
  exDataList,
}: ExDataListProps) => {
  return (
    <main>
      <Head>
        <title>Exhibitions index</title>
      </Head>

      <h1>Exhibitions index</h1>

      <table>
      <tr>
      <th>title</th>
      <th>location</th>
      <th>org</th>
      <th>start</th>
      <th>end</th>
     
      <th></th>
      
       
      
    </tr>
        {
        exDataList.map((ex: ExData) => (
          <Ex {...ex} key={ex.id} />
        ))}
      </table>
    </main>
  )
}

export default IndexPage
