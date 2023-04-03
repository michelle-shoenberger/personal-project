

export default function ExpenseDetail(props) {
  // props.expense - item_name, cat, date, cost, description

  return (
    <>
      <button className="btn btn-secondary mb-2" onClick={() => props.handleSelect(null)}>Go back...</button>
      <h1>Expense details</h1>
      <h2> {props.expense.item_name} </h2>
      <p> Cost: ${props.expense.cost} </p>
      <p> Date: {props.expense.date} </p>
      <p> Category: {props.expense.category_name} </p>
      <p> Description: {props.expense.description} </p>
    </>
  )
};