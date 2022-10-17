import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { ExData, ExDataProps } from '../../types/exdata'
import { GetExs, GetEx } from '../../lib/exdata_api'

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const exList: ExData[] = await GetExs()

  return {
    paths: exList.map((ex) => {
      return {
        params: {
          id: ex.id.toString(),
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ExDataProps, Params> = async (
  context
) => {
  const { id } = context.params! as Params
  const exData: ExData = await GetEx(id)
  return {
    props: {
      exData,
    },
  }
}

const Ex: NextPage<ExDataProps> = ({ exData }: ExDataProps) => {

  
  return (
    <main>
      <Head>
        <title>{exData._label}</title>
      </Head>
      <Link href="/">
        <a>Go back to home</a>
      </Link>
      <h1>Exhibition: {exData._label}</h1>
      <h2>Identifiers</h2>

<p>
{
 exData.identified_by[0].content
}
</p>
<h2>Dates</h2>
 <ul>

 {"timespan" in exData && "begin_of_the_begin" in exData.timespan ? <li>Start Date: {new Date(exData.timespan.begin_of_the_begin).toISOString().split('T', 1)[0]}</li> : ""}
{"timespan" in exData && "end_of_the_end" in exData.timespan ? <li>End Date: {new Date(exData.timespan.end_of_the_end).toISOString().split('T', 1)[0]}</li> : ""}


   
    
   </ul>

<h2>Organisation</h2>
<p>
 {
    "carried_out_by" in exData ? exData.carried_out_by[0]._label : ""
    }
</p>
    

      
    </main>
  )
}

export default Ex
