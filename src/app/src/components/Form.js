import {Fragment, useState} from 'react'

const Form = (props)=> {
	
	const [entry, setEntry] = useState({})
	const[error, setError] = useState("")

	const changeHandler = e => {
	    const {name, value} = e.target         
	    setEntry({[name]: value})
	    console.log(entry)
	}

	const submitHandler = e => {
	    e.preventDefault()
	    if(!entry.todo){
	        setError("Todo cannot be empty")
		return
	    }
	    fetch('http://localhost:8000/todos/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(entry)
	    })
		.then(response => {
			console.log(response)
			props.refreshHandler()
	    })
		.catch(err => {
			setError("Could not save the entry")
	    })
    }
	
	return (
	<Fragment>
	<h1>Create a ToDo</h1>
        <form>
        <div>
            <label for="todo">ToDo: </label>
            <input type="text" name="todo" onChange={changeHandler} />
          </div>
          <div style={{"marginTop": "5px"}}>
            <button onClick={submitHandler}>Add To Do!</button>
		</div>
	</form>
	{error.length!==0 && <h3 style={{'color': 'red'}}>{error}</h3>}
	</Fragment>
	)
}

export default Form
