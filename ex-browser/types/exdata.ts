export interface ExData {
  id: number
  label: string
  start: string
  end: string
  location: string
  org: string
  _label:string
  identified_by: any
  timespan:any
  carried_out_by: any
}





export interface ExDataProps {
  exData: ExData
}

export interface ExDataListProps {
  exDataList: ExData[]
}
