


import Head from 'next/head'
import Link from 'next/link'

import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';



import { GetStaticProps, NextPage } from 'next'
import Person from '../../components/person'

import { PersonData, PersonDataListProps} from '../../types/persondata'
import { GetPersons } from '../../lib/persondata_api'





export const getStaticProps: GetStaticProps = async (_context) => {
  
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

  let page = 1;
  let pp = 10;

  
  let pagination = Paging(page, pp)




  return (

    <div>


    <Head>
      <title> Alternative New York Exhibitions - People</title>
      <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
        crossOrigin="anonymous" />

    </Head>

    <main>
    <Breadcrumb>
    <Breadcrumb.Item href="../">{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
    <Breadcrumb.Item active >{process.env.NEXT_PUBLIC_PERSON_BREADCRUMB_PLURAL}</Breadcrumb.Item>
   
</Breadcrumb> 



<div className="container">
<div className="row">
<div className="col col-lg-3 facet-menu">
      <h1 className="title">{process.env.NEXT_PUBLIC_PERSON_TITLE}</h1>
      <p className="description">{process.env.NEXT_PUBLIC_PERSON_DESCRIPTION}</p>
      
</div>

<div className="col">
{pagination}
      <Table striped borderless hover >
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Died</th>
            <th>Nationality</th>
           <th></th>
          </tr>      
        </thead>
        <tbody>
          {
            personDataList.map((person: PersonData) => (
            <Person {...person} key={person.id} />
            ))
            }
        </tbody>
      </Table>


      <table> {
        personDataList.map((person: PersonData) => (
          <Person {...person} key={person.id} />
        ))}</table>
      </div>
</div></div>
    </main>
  </div>
   
  )
}

export default IndexPage




function Paging(page, pp) {

  page = parseInt(page);
  pp = parseInt(pp);
  let first_url = "?page=1&pp=" + pp;

  let prev_url = "?page=" + (page - 1) + "&pp=" + pp;
  let next_url = "?page=" + (page + 1) + "&pp=" + pp;
  let last_url = "?page=last&pp=" + pp;
  let items = [<Pagination.First href={first_url} />, <Pagination.Prev href={prev_url} />];

  const s = page;
  const e = parseInt(s) + 9;
  for (let number = s; number <= e; number++) {

    let url = "?page=" + (number) + "&pp=" + pp;

    items.push(
      <Pagination.Item key={number} href={url} active={number == page}>
        {number}
      </Pagination.Item>,
    );

  }
  items.push(<Pagination.Next href={next_url} />, <Pagination.Last href={last_url} />)

  const pagination = (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );

  return pagination;

}