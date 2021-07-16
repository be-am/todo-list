import logo from './logo.svg';
import { useState } from 'react';

import data from "./data.json";

import Header from "./Header";
import ToDoList from "./ToDoList";
import ToDoForm from './ToDoForm';


import './App.css';


function App() {
  const [ toDoList, setToDoList ] = useState(data);
  // 동적인 값을 계속 변경할 때
  //toDoList는 state 변수 setToDoList는 해당 변수를 갱신할 수 있는 함수
  //클래스 컴포넌트의 this.state.toDoList 와 this.setState와 유사함

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id == id ? { ...task, complete: !task.complete } : { ...task};
    })  // ...이라는 건 task 앞의 값까진 같게 한다는 뜻 여기서 내가 선택한 id와 같다면 toggle 을 이용해 기존의 complete를 변경 한다.
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
