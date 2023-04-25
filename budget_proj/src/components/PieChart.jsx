import { Pie } from 'react-chartjs-2';

export default function PieChart(props) {

  return (
    <>
      <Pie data={props.chartData} options={{
        plugins: {
          title: {
            display: true,
            text: "Total expeditures"
          }
        }
        }} 
      />
    </>
  )
}