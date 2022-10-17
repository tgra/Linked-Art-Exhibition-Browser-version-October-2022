export interface ExData {
  events: any
}

export interface Exhibition {
  id: number
  label: string
  start: string
  end: string
  location: string
  org: string
  _label:string
}



export interface ExDataProps {
  exData: ExData
}

export interface ExDataListProps {
  exDataList: ExData[]
}
