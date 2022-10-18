import { PersonData } from '../types/persondata'

export async function GetPerson(id: string): Promise<PersonData> {
  const response = await fetch(
    `http://localhost:3000/data/person/${id}` + `.json`
  )
  const personData: PersonData = (await response.json()) as PersonData
  return personData
}

export async function GetPersons(): Promise<PersonData[]> {
  const response = await fetch(
    'http://localhost:3000/api/persons_all'
    )
    const result =  await response.json()
  
  const personList: PersonData[] = ( result.persons) as PersonData[]
  return personList
}
