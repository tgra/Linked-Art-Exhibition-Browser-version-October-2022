export interface PersonData {
  
  id: number
  _label: string
  name: string
  born?: any
  died?: any
  nationality?: string
  identified_by?: any[]
  referred_to_by?: any[]
  equivalent? :any[]
  assigned_by?:any[]
}

export interface PersonDataProps {
  personData: PersonData
}

export interface PersonDataListProps {
  personDataList: PersonData[]
}
