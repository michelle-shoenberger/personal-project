import { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import axios from "axios";
import Chart, { CategoryScale } from 'chart.js/auto';
import BarChart from "./BarChart";
import PieChart from "./PieChart";
Chart.register(CategoryScale)

export default function BudgetSummary(props) {
  const [summary, setSummary] = useState({});
  const [tableData, setTableData] = useState([])
  const [chartData, setChartData] = useState("")
  const [piechartData, setPieChartData] = useState("")

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
    const cats = Object.keys(summary);
    const table = cats.map((cat) => {
      return {
        'cat': cat,
        'amount': `$${Math.round(summary[cat][0] *100)/100} of $${summary[cat][1]}`,
        'percent': Math.round((summary[cat][0]/summary[cat][1])*100*100)/100
      }
    });
    if (table.length > 0) {
      console.log(table)
      setTableData(table);
    }
  }, [summary])

  useEffect(() => {
    try {
      const cats = Object.keys(summary);
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
    setPieChartData(data)
  }, [summary])

  const showBudgetSummary = () => {
    //console.log(tableData)
    const totals = tableData.map((row, idx) => {
      if (row.cat ==='Total') {
        return (
          <div key={idx} className="row border-top border-dark text-center">
            <div className='col-4'>{row.cat}:</div>
            <div className='col-4'>{row.amount}</div>
          <div className='col-4'>{row.percent}% </div>
          </div>
        )
      }
      return (
        <div key={idx} className="row text-center">
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
      <div className="table">
        <h2 className="text-center">Budget status</h2>
        {showBudgetSummary()}
      </div>
      <Row>
        <Col>
          {chartData && <BarChart chartData={chartData} title="Budget progress" />}
        </Col>
        <Col>
          {chartData && <PieChart chartData={chartData} />}
        </Col>
      </Row>
    </>
  )
}

