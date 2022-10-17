import { PersonData } from '../types/persondata'

export async function GetPerson(id: string): Promise<PersonData> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )
  const personData: PersonData = (await response.json()) as PersonData
  return personData
}

export async function GetPersons(): Promise<PersonData[]> {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_page=1'
  )
  const personList: PersonData[] = (await response.json()) as PersonData[]
  return personList
}
