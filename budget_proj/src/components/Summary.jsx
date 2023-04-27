import { useState, useEffect } from "react";
import axios from "axios";
import Chart, { CategoryScale } from 'chart.js/auto';
import PieChart from "./PieChart";
import BudgetSummary from "./BudgetSummary";

Chart.register(CategoryScale)

export default function Summary(props) {
  const [summary, setSummary] = useState({});
  const [chartData, setChartData] = useState("")

  useEffect(() => {
    const getSummary = async () => {
      try {
        const resp = await axios.get('/api/summary/')
          .catch((e) => {
            console.log("getSummary error: " + e)
          });
        //console.log(resp.data)
        setSummary(resp.data)
      } catch {
        console.log('Error - cannot fetch summary')
      }
    }; 
    getSummary();
  }, []);

  useEffect(() => {
    const chartCats = Object.keys(summary).filter((cat) => cat !== "Total")
    const data = {
      labels: chartCats,
      datasets: [
        {
          label: "Total expenditures",
          data: chartCats.map((cat) => {
            return Math.round(summary[cat][0] *100)/100
          }),
          borderColor: "black",
          borderWidth: 2, 
          backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey']
        }
      ]
    }
    //console.log(data)
    setChartData(data)
  }, [summary])

  return (
    <>
      <h2>Budget status</h2>
      <BudgetSummary summary={summary}/>
      {chartData && <PieChart chartData={chartData} />}
    </>
  )
};

