import { useState, useEffect } from "react";
import Chart, { CategoryScale } from 'chart.js/auto';
import BarChart from "./BarChart";
Chart.register(CategoryScale)

export default function BudgetSummary(props) {
  const [tableData, setTableData] = useState([])
  const [chartData, setChartData] = useState("")

  useEffect(() => {
    const cats = Object.keys(props.summary);
    const table = cats.map((cat) => {
      return {
        'cat': cat,
        'amount': `$${Math.round(props.summary[cat][0] *100)/100} of $${props.summary[cat][1]}`,
        'percent': Math.round((props.summary[cat][0]/props.summary[cat][1])*100*100)/100
      }
    });
    if (table.length > 0) {
      console.log(table)
      setTableData(table);
    }
  }, [props.summary])

  useEffect(() => {
    try {
      const cats = Object.keys(props.summary);
      const data = {
        labels: cats,
        datasets: [
          {
            label: "Total expenditures",
            data: cats.map((cat) => {
              console.log(cat)
              console.log(tableData.filter((row) => row.cat == cat))
              return tableData.filter((row) => row.cat == cat)[0].percent
            }),
            borderColor: "black",
            borderWidth: 2, 
            backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'black']
          }
        ]
      }
      console.log(data)
      setChartData(data)
    } catch {
      setChartData("")
    }
  }, [tableData])

  const showBudgetSummary = () => {
    //console.log(tableData)
    const totals = tableData.map((row, idx) => {
      if (row.cat ==='Total') {
        return (
          <div key={idx} className="row border-top border-dark">
            <div className='col-4'>{row.cat}:</div>
            <div className='col-4'>{row.amount}</div>
          <div className='col-4'>{row.percent}% </div>
          </div>
        )
      }
      return (
        <div key={idx} className="row">
          <div className='col-4'>{row.cat}:</div>
          <div className='col-4'>{row.amount}</div>
          <div className='col-4'>{row.percent}% </div>
        </div>
      )
    })
    return totals
  }
  return (
    <>
      <h2 className="mt-3"> Budget status </h2>
      {showBudgetSummary()}
      {chartData && <BarChart chartData={chartData} title="Budget progress" />}
      
    </>
  )
}

