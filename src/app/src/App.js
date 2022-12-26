import './App.css';
import logo from './logo.svg';
import Todos from './components/Todos'
import Form from './components/Form'


export function App() {
  return (
    <div className="App">
      <Todos />
      <Form />
    </div>
  );
}

export default App;
