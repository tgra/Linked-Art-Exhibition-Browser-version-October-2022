import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';

 
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

  if (!exData) return <div>No data...</div>
  
  let carried_out_by = (("carried_out_by" in exData) && (("_label" in exData.carried_out_by[0]) || ("id" in exData.carried_out_by[0])) )  ? true : false;
   
  let influenced_by = (("influenced_by" in exData) && (("_label" in exData.influenced_by[0]) || ("id" in exData.influenced_by[0])) )  ? true : false;
  
  
  return (

    <div>
    
    <Head>
      <title>{process.env.NEXT_PUBLIC_ACTIVITY_BREADCRUMB_SINGULAR}</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
        crossOrigin="anonymous"
      ></link>
<script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin></script>
    
    
    
    </Head>
    
    
<main>
<Breadcrumb>
    <Breadcrumb.Item href="../">{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
    <Breadcrumb.Item href="../exhibitions">{process.env.NEXT_PUBLIC_ACTIVITY_BREADCRUMB_PLURAL}</Breadcrumb.Item>
    <Breadcrumb.Item active href="#">{process.env.NEXT_PUBLIC_ACTIVITY_BREADCRUMB_SINGULAR}</Breadcrumb.Item>
</Breadcrumb> 


     
<h1>{process.env.NEXT_PUBLIC_ACTIVITY_BREADCRUMB_SINGULAR}: {exData._label}</h1>
<Table>
   
      {("took_place_at" in exData) ? <tr><th>Location</th><td>{exData.took_place_at._label}</td></tr> : ""}

      {"timespan" in exData && "begin_of_the_begin" in exData.timespan ? <tr><th>Start Date</th><td>{new Date(exData.timespan.begin_of_the_begin).toISOString().split('T')[0]}</td></tr> : ""}
      {"timespan" in exData && "end_of_the_end" in exData.timespan ? <tr><th>End Date</th><td>{new Date(exData.timespan.end_of_the_end).toISOString().split('T')[0]}</td></tr> : ""}

      { carried_out_by == true  ? <tr><th>{process.env.NEXT_PUBLIC_CARRIED_OUT_BY}</th><td><ol>{exData.carried_out_by.map((obj) => (<li key={obj.id.toLowerCase().replace(process.env.NEXT_PUBLIC_BASE_URI, "")}><Link href={obj.id.toLowerCase().replace(process.env.NEXT_PUBLIC_BASE_URI, "")}>{"_label" in obj ? obj._label : obj.id}</Link></li>))}</ol></td></tr> : ""}
      { influenced_by == true  ? <tr><th>{process.env.NEXT_PUBLIC_INFLUENCED_BY}</th><td><ol>{exData.influenced_by.map((obj) => (<li key={obj.id.toLowerCase().replace(process.env.NEXT_PUBLIC_BASE_URI, "")}><Link href={obj.id.toLowerCase().replace(process.env.NEXT_PUBLIC_BASE_URI, "")}>{"_label" in obj ? obj._label : obj.id}</Link></li>))}</ol></td></tr> : ""}

      {("part" in exData) ?
          <tr><th>People Associated With Exhibition</th><td></td></tr>
          : ""}
        {
          ("part" in exData) ?
            exData.part.involved.map((set) => (

              <tr>
                <td><b>Role</b> {set._label}</td>
                <td>
                  <ol>
                    {
                      set.about.map((agent) => (
                        <li key={'/person/' + agent.id.split("/").pop()}><Link href={'/person/' + agent.id.split("/").pop()}>{agent._label}</Link></li>
                      ))
                    }
                  </ol>
                </td>
              </tr>
            ))
            : ""}

</Table>  
</main>
</div>

  )
}

export default Ex
