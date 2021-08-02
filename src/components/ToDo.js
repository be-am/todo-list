import React from 'react';

const ToDo = ({todo, handleToggle}) => {

    const handleClick = (e) => {
        e.preventDefault();
        handleToggle(e.target.id);
    }

    return (
        <div id={todo.id}  name="todo" value={todo.id} onClick={handleClick} className={todo.complete ? "todo strike" : "todo"}>
            {todo.task}
        </div>
    );
};

export default ToDo;