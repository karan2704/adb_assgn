import {useState, useEffect} from 'react'

const Todos = () => {
	const [todoList, setTodoList] = useState({})
	useEffect(() => {
		fetch('http://localhost:8000/todos/')
		.then(response => {
			response.json()
			.then(res => {
				console.log(res)
				setTodoList(res)
			})
			.catch(err => {
				alert(err)
			})
		})
		.catch(err => {
			alert(err)
		})
	}, [])

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
		</div>
	)
}

export default Todos;
