import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { PersonData, PersonDataProps } from '../../types/persondata'
import { GetPersons, GetPerson } from '../../lib/persondata_api'

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const personList: PersonData[] = await GetPersons()
  return {
    paths: personList.map((person) => {
      return {
        params: {
          id: person.id.toString(),
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PersonDataProps, Params> = async (
  context
) => {
  const { id } = context.params! as Params
  const personData: PersonData = await GetPerson(id)
  return {
    props: {
      personData,
    },
  }
}

const Person: NextPage<PersonDataProps> = ({ personData }: PersonDataProps) => {
  return (
    <main>
      <Head>
        <title>{personData._label}</title>
      </Head>

      <h1>{personData._label}</h1>

      <p>{personData.id}</p>

      <Link href="/">
        <a>Go back to home</a>
      </Link>
    </main>
  )
}

export default Person
