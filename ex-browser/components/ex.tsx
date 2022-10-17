import Link from 'next/link'
import { Exhibition } from '../types/exdata'

export default function Ex({ label, id, start, end,  org }: Exhibition) {
  return (
    <tr>
      <td>{label}</td>
      <td>{org}</td>
      <td>{start.split('T', 1)[0]}</td>
      <td>{end != undefined ? end.split('T', 1)[0] : ""}</td>
     
      <td><Link href={`/exhibition/${id}`}><a>view</a></Link></td>
      
       
      
    </tr>
  )
}

