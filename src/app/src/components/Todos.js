import {useState, useEffect} from 'react'

const Todos = (props) => {
	const [todoList, setTodoList] = useState({})
	const [error, setError] = useState("")
	useEffect(() => {
		fetch('http://localhost:8000/todos/')
		.then(response => {
			response.json()
			.then(res => {
				console.log(res)
				setTodoList(res)
			})
			.catch(err => {
				console.log(err)
				setError("Could not parse JSON")
			})
		})
		.catch(err => {
			console.log(err)
			setError("Failed to fetch Todos")
		})
	}, [props.refreshKey])

	return(
		<div>
			<h1>ToDo List</h1>
			<ul>
				{todoList.res && todoList.res.map(entry => {
					return (
						<li>{entry}</li>
					)
				})
				}
			</ul>
		{error.length!==0 && <h3 style={{'color': 'red'}}>{error}</h3>}
		</div>
	)
}

export default Todos;
