import Link from 'next/link'
import { PersonData } from '../types/persondata'

export default function Person({  id, _label }: PersonData) {
  return (
    

<tr>
<td>{_label}</td>
<td></td>
<td></td>
<td></td>

<td><Link href={`/person/${id}`}><a>view</a></Link></td>

 

</tr>
  )
}
