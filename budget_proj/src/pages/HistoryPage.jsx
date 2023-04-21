import { useState, useEffect } from "react"
import {useLoaderData} from 'react-router-dom'
import axios from "axios";
import { MonthlyTotals } from "../components/MonthlyTotals";
import MonthlyCatsTotals from "../components/MonthlyCatsTotals";


export async function historyLoader() {
  try{
    const resp = await axios.get('/api/history/')
    .catch((e) => {
      console.log("getHistory error: " + e)
    });
    console.log('api-history', resp.data)
    if (resp.data) {
      return resp.data
    } else {
      return null
    }
  } catch {
    console.log('Error - unable to fetch history')
    return null
  }
};

export function HistoryPage() {
  const history = useLoaderData();
  const [barchartData, setBarChartData] = useState("")




  return (
    <>
      <h2>2023</h2>
      <MonthlyTotals input={history} year={2023}/>
      <MonthlyCatsTotals input={history} year={2023}/>
    </>
  )
}