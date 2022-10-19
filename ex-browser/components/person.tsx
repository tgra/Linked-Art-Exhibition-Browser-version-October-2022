import Link from 'next/link'
import { PersonData } from '../types/persondata'

export default function Person({  id, _label, name, born, died, nationality }: PersonData) {
  return (
    

<tr key={id}>
                <td>{name}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>{nationality}</td>
                <td><Link href="../person/[id]" as={`/person/${id}`}>View</Link></td>
              </tr>



  )
}
