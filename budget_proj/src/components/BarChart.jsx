import { Bar } from "react-chartjs-2";

export default function BarChart(props) {
  console.log(props.chartData)
  console.log(!props.chartData)
  return (
    <div>
      <Bar data={props.chartData} options={{
        plugins: {
          title: {
            display: true,
            text: "Budget progress"
          },
          legend: {
            display: false
          }
        }
      }} />
    
    </div>
  )
}