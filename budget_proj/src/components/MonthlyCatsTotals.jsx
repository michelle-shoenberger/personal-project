import { Chart, LinearScale, PointElement, LineElement, Tooltip, Legend} from 'chart.js';
import { useState, useEffect } from 'react';
import ScatterChart from './ScatterChart'

Chart.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function MonthlyCatsTotals(props) {
  const [scatterchartData, setScatterChartData] = useState("")
  const [scatterOptions, setScatterOptions] = useState("")

  useEffect(() => {
    const cats = (props.input ? Object.keys(Object.values(props.input)[0]) : []) //array of categories
    console.log('datasets', cats)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data = {
      datasets: cats.map((cat) => {
        return ({
          label: cat,
          data: months.map((month, idx) => {
            let y;
            if (`${props.year}-${idx+1}` in props.input) {
              y = props.input[`${props.year}-${idx+1}`][cat][0]
            } else {
              y = 0
            }
            return (
              {
                x: month,
                y: y
              }
            )
          })
        })
      })
    }
    console.log(data)
    setScatterChartData(data)
    const options = {
      scales: {
        x: {
          type: 'category',
          labels: months
        },
        y: {
          beginAtZero: true,
        }
      }
    }
    setScatterOptions(options)
  }, [props.input]);

  return (
    <>
      {scatterchartData && <ScatterChart data={scatterchartData} options={scatterOptions}/>}
    </>
  )
}