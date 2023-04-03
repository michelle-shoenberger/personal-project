import { useState } from "react";

export default function ExpenseFilter(props) {
  const [choice, setChoice] = useState(() => {
    if (props.initial) {
      return props.initial['by']
    } else {
      return null
    }
  });

  const handleFilter = (by, data) => {
    props.handleFilter({
      'by': by,
      'word': data
    })
  };

  const createSearch = () => {
    if (choice) {
      console.log('choice')
      if (choice==="name") {
        return <input className="myform" type="text" placeholder="Search" value={props.initial && props.initial['word']} onChange={(e) => handleFilter('name', e.target.value)}/>
      } else {
        return (
          <select className="myform" onChange={(e)=> handleFilter('cat', e.target.value)}>
            <option value="-1">All</option>
            {props.cats.map((choice) => <option value={choice.id}>{choice.name}</option>)}
          </select>
        )
      }
    } else {
      console.log('no choice')
      return <input className="myform" type="text" placeholder="Search"/>
    }
  };

  return (
    <>
      <h1>Filter section</h1>
      <div>
        {createSearch()}
        <span className="p-2">
          <input type="radio" name="filter" id="name" onChange={() => setChoice("name")}/>
          <label htmlFor="name">By name</label>
          <input className="ms-2" type="radio" name="filter" id="cat" onChange={() => setChoice("cat")}/>
          <label htmlFor="cat">By category</label>
        </span>
      </div>
    </>
  )
}