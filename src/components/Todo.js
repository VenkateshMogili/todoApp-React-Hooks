import React from 'react';
function Todo({todo,index,completeTodo,deleteTodo}){
    return (
      <div style={{textDecoration:todo.completed?"line-through":""}} className="todo">
        <p className="todoTitle">{todo.title}</p>
        <div>
          <button onClick={()=>completeTodo(index)} className="desktop">Complete</button>
          <button onClick={()=>completeTodo(index)} className="mobile">✓</button>
          <button className="close" onClick={()=>deleteTodo(index)}>x</button>
        </div>
      </div>
    )
}
export default Todo;