import { useEffect, useState } from 'react';

import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import ToDoForm from './components/ToDoForm';
import axios from 'axios';

import './App.css';


function App() {
  
  const [ toDoList, setToDoList ] = useState([]);
  const url = 'http://localhost:4000/task';
  
  useEffect(() =>{
		async function fetchData(){
      const result = await axios.get(url
      ,);
      setToDoList(result.data);
		}
		fetchData();
	},[]);

  // 동적인 값을 계속 변경할 때
  //toDoList는 state 변수 setToDoList는 해당 변수를 갱신할 수 있는 함수
  //클래스 컴포넌트의 this.state.toDoList 와 this.setState와 유사함
  

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  }

  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    setToDoList(filtered);
  }

  const addTask = (userInput) => {
    let copy = [...toDoList];
    copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false }];
    setToDoList(copy);
  }


  return (
    <div className="App">
      <Header />
      <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
      <ToDoForm addTask={addTask}/>  
    </div>
  );
}

export default App;