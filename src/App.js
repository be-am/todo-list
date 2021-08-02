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
		const fetchData= async () => {
      const result = await axios.get(url);
      setToDoList(result.data);
		};
    fetchData();
	},[]);

  // 동적인 값을 계속 변경할 때
  //toDoList는 state 변수 setToDoList는 해당 변수를 갱신할 수 있는 함수
  //클래스 컴포넌트의 this.state.toDoList 와 this.setState와 유사함
  

  const handleToggle = async (id) => {
    const idx = toDoList.findIndex(elem => elem.id === id);
    
    if (idx !== -1) {
      const { data } = await axios.put(`${url}/${id}`, {
        ...toDoList[idx],
        complete: !toDoList[idx].complete
      });
      setToDoList([
        ...toDoList.slice(0, idx),
        data,
        ...toDoList.slice(idx + 1, toDoList.length)
      ]);
    }
  };

  const handleFilter = async () => {
    const filtered = toDoList.filter(elem => elem.complete);
    
    try {
      await Promise.all(
        filtered.map(async (elem) => {
          return await axios.delete(`${url}/${elem.id}`)
        })
      );
      setToDoList(toDoList.filter(elem => !filtered.includes(elem)));
    } catch(err) {
      console.error(err);
      return err;
    }
  }


  const addTask = async (userInput) => {
    const plusTask = {
      task: userInput, 
      complete: false 
    };

    const res = await axios.post(url, plusTask).catch(err => err);
    if (res?.data) {
      setToDoList([
        ...toDoList,
        plusTask
      ]);
    }
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