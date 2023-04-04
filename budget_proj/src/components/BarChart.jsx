import { Bar } from "react-chartjs-2";

export default function BarChart(props) {
  console.log(props.chartData)
  console.log(!props.chartData)
  return (
    <div className='mt-2 row justify-content-center'>
      <div className='col-lg-6'>
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
      
      </div>
    </div>
  )
}