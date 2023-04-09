import {useNavigate} from 'react-router-dom'

export default function ExpenseFilter(props) {
  // props - initial ({by, value}), handleFilter, cats
  const navigate = useNavigate();
  const passInput = (data) => {
    props.handleFilter((prevState) => ({
      ...prevState,
      'value': data
    }));
  };

  const passBy = (by) => {
    props.handleFilter({
      'value': "",
      'by': by
    });
  };

  const createSearch = () => {
    console.log(props.initial)
    if (props.initial) {
      if (props.initial.by==="name") {
        return <input className="myform" type="text" placeholder="Search" value={props.initial && props.initial['value']} onChange={(e) => passInput(e.target.value)}/>
      } else {
        return (
          <select className="myform" onChange={(e)=> passInput(e.target.value)}>
            <option value="">All</option>
            {props.cats.map((choice) => <option value={choice.id}>{choice.name}</option>)}
          </select>
        )
      }

    }
  };

  const handleClick = () => {
    navigate('create')
  }

  return (
    <>
      <button className="btn btn-success mb-3" onClick={handleClick}>Create a new expense</button>
      <div>
        {createSearch()}
        <span className="p-2">
          <input type="radio" name="filter" id="name" onChange={() => passBy("name")} defaultChecked={props.initial.by==='name' }/>
          <label htmlFor="name">By name</label>
          <input className="ms-2" type="radio" name="filter" id="cat" onChange={() => passBy("cat")} defaultChecked={props.initial.by==='cat'} />
          <label htmlFor="cat">By category</label>
        </span>
      </div>
    </>
  )
}