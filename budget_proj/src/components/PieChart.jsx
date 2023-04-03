import { Pie } from 'react-chartjs-2';

export default function PieChart(props) {

  return (
    <div className='mt-2'>
      <Pie data={props.chartData} options={{
        plugins: {
          title: {
            display: true,
            text: "Total expeditures"
          }
        }
        }}
      />
    </div>
  )
}