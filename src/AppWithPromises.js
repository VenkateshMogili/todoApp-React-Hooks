import React, { useState, useEffect } from 'react';
import './App.css';
import {Todo,TodoForm} from './components';

// Hooks and API with Promises.
function AppWithPromises(){
  const [todos,setTodos]=useState([]);
  const [error,setError]=useState("");

  useEffect(()=>{
    // GET api
    const fetchData = ()=>{
      fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response=>response.json())
      .then(data=>setTodos(data.splice(10,10)))
      .catch(err=>{
        setError(err.toString());
        setTimeout(() => {
          setError("");
        }, 5000);
      })
    };
    fetchData();
  },[]);

  // Copy of All todos.
  const newTodos =[...todos];
  // POST api
  const addTodo= title =>{
      let id = todos[todos.length-1]['id']+1;
        let todo={
          title,
          id,
          completed:false,
        }
      fetch("https://jsonplaceholder.typicode.com/todos",{
        method:"POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response=>response.json())
      .then(data=>{
        if(data){
          const newTodos = [...todos,todo];
          setTodos(newTodos);
        }
      })
      .catch(err=>{
        setError(err.toString());
        setTimeout(() => {
          setError("");
        }, 5000);
      })
  }
   // PUT api
   const completeTodo = index =>{
     let idx = newTodos.findIndex(todo=>todo.id===index);
     newTodos[idx].completed=true;
     fetch("https://jsonplaceholder.typicode.com/todos/"+index,{
         method:"PUT",
         body: JSON.stringify({newTodos}),
         headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
       })
       .then(response=>response.json())
       .then(data=>setTodos(newTodos))
       .catch(err=>{
         setError(err.toString());
         setTimeout(() => {
           setError("");
         }, 5000);
       });
   }
  // DELETE api
  const deleteTodo = index =>{
    fetch("https://jsonplaceholder.typicode.com/todos/"+index,{
        method:"DELETE"
      })
      .then(response=>response.json())
      .then(data=>{
       let idx = newTodos.findIndex(todo=>todo.id===index);
       newTodos.splice(idx,1);
       setTodos(newTodos);
      })
      .catch(err=>{
        setError(err.toString());
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  }
  return (
    <div className="app" style={{height:window.innerHeight}}>
    <div>
      <h1>Todo Management with React Hooks and API with Promises </h1>
      <p className="jsonPlaceholder">https://jsonplaceholder.typicode.com</p>
    </div>
    <div className="todo-list" id="todoData">
        {todos.length<=0 && <div><h1 className="no-todo">Oops, No Todo Found!</h1></div>}
        {todos.map((todo)=>(
          <Todo key={todo.id} index={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}/>
        ))}
      </div>
        <TodoForm addTodo={addTodo}/>
        <span style={{color:"red"}}>{error}</span>
        <div className="creator">
          <p><span>Developer</span><br/><a href="https://github.com/VenkateshMogili" target="_blank" rel="noopener noreferrer">Venkatesh Mogili</a></p>
        </div>
    </div>
  )
}
export default AppWithPromises;