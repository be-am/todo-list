import { useEffect, useState } from 'react';

import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import ToDoForm from './components/ToDoForm';
import axios from 'axios';

import './App.css';

const url = 'http://localhost:4000/task';

function App() {
  
  const [toDoList, setToDoList] = useState([]);
  
  useEffect(() =>{
		async function fetchData(){
      const result = await axios.get(url);
      setToDoList(result.data);
		};
    fetchData();
	},[]);

  // 동적인 값을 계속 변경할 때
  //toDoList는 state 변수 setToDoList는 해당 변수를 갱신할 수 있는 함수
  //클래스 컴포넌트의 this.state.toDoList 와 this.setState와 유사함
  

  const handleToggle = (id) => {
    setToDoList(toDoList.map(elem => {
      if (elem.id === Number(id)) {
        axios.put(url+'/'+elem.id,{...elem.task,complete: !elem.complete})
        return {
          ...elem,
          complete: !elem.complete
        }
      }
      return elem;
    }));
  };

  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      if(task.complete){
        axios.delete(url+'/'+task.id)
      }
      return !task.complete;
    });
    setToDoList(filtered);
  }

  const addTask = (userInput) => {
    let copy = [...toDoList];
    let plusTask = { id: toDoList.length + 1, task: userInput, complete: false };
    copy = [...copy, plusTask];
    axios.post(url, plusTask).then(() => {
      setToDoList(copy);
    })
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