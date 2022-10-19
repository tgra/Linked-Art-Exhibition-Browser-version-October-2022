import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'

import Pagination from 'react-bootstrap/Pagination';

import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {

  faSortAlphaUp ,
  faSortAlphaDown
} from "@fortawesome/free-solid-svg-icons";


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

  let page = 1;
  let pp = 10;
  let sort = "asc";
  let orderby = "label";

  let pagination = Paging(page,pp, sort, orderby)


  Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false,
    configurable: true
  });


  return (
<div>
    
        
    <Head>
      <title> Alternative New York Exhibitions</title>
      <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
  crossOrigin="anonymous" />
    
    </Head>

<main>

<Breadcrumb>
    <Breadcrumb.Item href="../">{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
    <Breadcrumb.Item active href="#">{process.env.NEXT_PUBLIC_ACTIVITY_BREADCRUMB_PLURAL}</Breadcrumb.Item>
</Breadcrumb> 
      
<div className="container">
<div className="row">
<div className="col col-lg-3 facet-menu">
<h2>{process.env.NEXT_PUBLIC_ACTIVITY_TITLE}</h2>
      <p>{process.env.NEXT_PUBLIC_ACTIVITY_DESCRIPTION}</p>
      
      <p>Number of records: </p>

    <span className="fs-5 fw-semibold">Facets</span>
 
  


</div>
<div className="col">
Page
{pagination}
      <Table  striped borderless hover size="sm">
    <thead>
   
      <tr>
      <th>Exhibition Title</th>
     
      <th>Organisation</th>
      <th>Start</th>
      <th>End</th>
     
      <th>View</th>
      
       
      
    </tr>
    </thead>
    <tbody>
        {
        exDataList.map((ex: ExData) => (
          <Ex {...ex} key={ex.id} />
        ))}
        </tbody>
      </Table>




   
      
    </div>
</div></div>
    </main>
  </div>


   
  )
}

export default IndexPage



function Paging(page:number  , pp:number, sort:string, orderby:string) {
 
  
  
  let first_url = "?page=1&pp="+ pp + "&sort=" + sort + "&orderby=" + orderby;

  let prev_url = "?page=" + (page - 1) + "&pp="+ pp+ "&sort=" + sort + "&orderby=" + orderby;
  let next_url = "?page=" + (page + 1) + "&pp="+ pp+ "&sort=" + sort + "&orderby=" + orderby;
  let last_url = "?page=last&pp="+ pp + "&sort=" + sort + "&orderby=" + orderby;
  let items = [<Pagination.First href={first_url}/>,<Pagination.Prev href={prev_url}/>];

  const s = page;
  const e = s + 4;


  for (let number = s; number <= e; number++) {

    let url = "?page=" + (number) + "&pp="+ pp + "&sort=" + sort + "&orderby=" + orderby;

    items.push(
      <Pagination.Item key={number} href={url} active={number == page}>
        {number}
      </Pagination.Item>,
    );
    
  }
  items.push(<Pagination.Next href={next_url}/>,<Pagination.Last href={last_url}/>)
  
  const pagination = (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
  
  return pagination;

}
