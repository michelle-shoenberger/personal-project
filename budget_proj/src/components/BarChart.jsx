import { Bar } from "react-chartjs-2";

export default function BarChart(props) {
  console.log(props.chartData)
  console.log(!props.chartData)
  return (
    <>
      <Bar data={props.chartData} options={{
        plugins: {
          title: {
            display: true,
            text: `${props.title}`,
          },
          legend: {
            display: false
          }
        }
      }} />
    </>
  )
}