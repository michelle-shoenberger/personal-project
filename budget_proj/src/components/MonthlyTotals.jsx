import { useState, useEffect } from "react"
import BarChart from './BarChart'
import Chart, { CategoryScale } from 'chart.js/auto';

Chart.register(CategoryScale)
export function MonthlyTotals(props) {
  const [barchartData, setBarChartData] = useState("")
  // setting bar chart data
  // props.input - needs total and limit by month for year
  // props.year - str

  useEffect(() => {
    try {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const data = {
        labels: months,
        datasets: [
          {
            label: "Monthly totals",
            data: months.map((month, idx) => {
              if (`${props.year}-${idx+1}` in props.input) {
                
                return props.input[`${props.year}-${idx+1}`]['Total'][0]
              } else {
                return 0
              }
            }),
            borderColor: "black",
            borderWidth: 2, 
            backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'black']
          }
        ]
      }
      console.log('barchart', data)
      setBarChartData(data)
    } catch {
      console.log('bar chart: data failed to populate')
      setBarChartData("")
    }
  }, [props.input])

  return (
    <>
      <h2> Monthly bar chart </h2>
      {barchartData && <BarChart chartData={barchartData} title="Monthly Totals" />}
    </>
  )
}