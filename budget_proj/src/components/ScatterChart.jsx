import { Scatter } from "react-chartjs-2";

export default function BarChart(props) {
  console.log('scatter-data', props.data)
  return (
    <div className="d-flex justify-content-center">
      <Scatter data={props.data} options={props.options} />
    
    </div>
  )
}