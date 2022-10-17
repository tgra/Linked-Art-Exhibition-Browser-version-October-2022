export interface PersonData {
  userId: number
  id: number
  title: string
  body: string
}

export interface PersonDataProps {
  personData: PersonData
}

export interface PersonDataListProps {
  personDataList: PersonData[]
}
