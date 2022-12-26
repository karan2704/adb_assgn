import {useState} from 'react'
import './App.css';
import logo from './logo.svg';
import Todos from './components/Todos'
import Form from './components/Form'


export function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const refreshHandler = () => {
	setRefreshKey(key => key + 1)
  }
  return (
    <div className="App">
      <Todos refreshKey={refreshKey} refreshHandler={refreshHandler} />
      <Form refreshKey={refreshKey} refreshHandler={refreshHandler}/>
    </div>
  );
}

export default App;
