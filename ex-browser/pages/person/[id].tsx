import Link from 'next/link'
import Head from 'next/head'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';


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

  let ids = personData.identified_by
  let names = [];
  let identifiers = [];
  for (var idx in ids) {

    switch (ids[idx].type) {

      case "Name":
        names.push(ids[idx])
        break

        case "Identifier":
          identifiers.push(ids[idx])
          break
    }


  }



  return (
    <div>


    <Head>
      <title> Alternative New York Exhibition - Person</title>
      <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
        crossOrigin="anonymous" />

    </Head>


    <main>


      <Breadcrumb>
        <Breadcrumb.Item href="../">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="../persons">People</Breadcrumb.Item>
        <Breadcrumb.Item active href="#">Person</Breadcrumb.Item>
      </Breadcrumb>



       
<div className="container">
<div className="row">
<div className="col col-lg-3 facet-menu">
<h2>{process.env.NEXT_PUBLIC_PERSON_BREADCRUMB_SINGULAR}</h2>
    
      

   
  


</div>
<div className="col">



      <Table striped borderless hover>
        <tbody>{names.map((ident) => (<tr><th>Name</th><td>{ident.content}</td></tr>))}
          {"born" in personData ? <tr><th>Born</th><td>{personData.born.timespan.identified_by[0].content}</td></tr> : ""}
          {"died" in personData ? <tr><th>Died</th><td>{personData.died.timespan.identified_by[0].content}</td></tr> : ""}
          
          {"referred_to_by" in personData ? <tr><th>Description</th><td></td></tr> : ""}
        {"referred_to_by" in personData ? personData.referred_to_by.map((statement) => (<tr><td>{statement.classified_as[0]._label}</td><td>{statement.content}</td></tr>)): ""}

          <tr><th>Identifiers</th><td></td></tr>
          {identifiers.map((ident) => (<tr><td></td><td>{ident.content} <sup>attributed by:<Link href={ident.attributed_by[0].carried_out_by[0].id.replace(process.env.NEXT_PUBLIC_BASE_URI,"").toLowerCase()}>{ident.attributed_by[0].carried_out_by[0]._label}</Link></sup></td></tr>))}
       
        {"equivalent" in personData ? <tr><th>Equivalent Entities</th><td></td></tr> : ""}
        {"equivalent" in personData ? personData.equivalent.map((entity) => (<tr><td></td><td><Link target="_new" href={entity.id}>{entity.id}</Link> <sup>{entity.type}</sup></td></tr>)): ""}

        {"assigned_by" in personData ?  <tr><th>Attribute Assignments</th><td></td></tr> : ""}
        {"assigned_by" in personData ? personData.assigned_by.map((assign) => (<tr><th>Assignment</th><td>
          {
          assign.involved.map((set) => ( 
            <div>
            <h5>{set._label}</h5> 

            <ol> {set.about.map((s) => (
              <li key={s.id}><Link href={'/exhibition/' + s.id.split("/").pop()}>{s._label}</Link></li>
            ))}</ol>
          </div> ))}</td></tr>)): ""}

         
          </tbody></Table>



</div>
</div>
</div>

    </main>
  </div>


  )
}

export default Person
