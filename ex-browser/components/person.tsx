import Link from 'next/link'
import { PersonData } from '../types/persondata'

export default function Person({ title, body, id }: PersonData) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{body}</p>
      <Link href={`/person/${id}`}>
        <a>Read more...</a>
      </Link>
    </article>
  )
}
