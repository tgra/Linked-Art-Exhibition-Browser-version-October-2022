import { ExData } from '../types/exdata'

export async function GetEx(id: string): Promise<ExData> {
  const response = await fetch(
    `http://localhost:3000/data/activity/${id}` + `.json`
  )
  const exData: ExData = (await response.json()) as ExData
  return exData
}

export async function GetExs(): Promise<ExData[]> {
  const response = await fetch(
    'http://localhost:3000/api/events_all'
  )
  const exList: ExData[] = (await response.json()) as ExData[]
  return exList
}
