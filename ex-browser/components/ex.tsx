import Link from 'next/link'
import { ExData } from '../types/exdata'

export default function Ex({ label, id, start,end,  org }: ExData) {
  return (
    <tr>
      <td>{label}</td>
      <td>{org}</td>
      <td>{start != undefined ? start.split('T', 1)[0] : "" }</td>
      <td>{end != undefined ? end.split('T', 1)[0] : "" }</td>
     
      <td><Link href={`../exhibition/${id}`}><a>view</a></Link></td>
      
       
      
    </tr>
  )
}

