import {Fragment, useState} from 'react'

const Form = () => {
	
	const [entry, setEntry] = useState({})

	const changeHandler = e => {
	    const {name, value} = e.target         
	    setEntry({[name]: value})
	    console.log(entry)
	}

	const submitHandler = e => {
	    e.preventDefault()
	    fetch('http://localhost:8000/todos/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(entry)
	    })
		.then(response => {
			console.log(response)
			window.location.reload()
	    })
		.catch(err => {
			alert(err)
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
	</Fragment>
	)
}

export default Form
