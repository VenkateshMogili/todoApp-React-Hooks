import React, { useState, useEffect } from 'react';
import './App.css';
import {Todo,TodoForm} from './components';

// Hooks with API calls with Async/Await
function App(){
  const [todos,setTodos]=useState([]);
  const [error,setError]=useState("");

  useEffect(()=>{
    // GET api
      const fetchData = async ()=>{
      try{
        const response =await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        setTodos(data.splice(10,10));
      } catch(err){
        setError(err.toString());
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchData();
  },[]);
  // Copy of All todos.
  const newTodos =[...todos];
  // POST api
  const addTodo= async title =>{
      let id = todos[todos.length-1]['id']+1;
      let todo={
        title,
        id,
        completed:false,
      }
      try{
        const response = await fetch("https://jsonplaceholder.typicode.com/todos",{
        method:"POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
        });
        console.log("POST Response",response);
        const newTodos = [...todos,todo];
        setTodos(newTodos);
      } catch(err){
        setError(err.toString());
        setTimeout(() => {
          setError("");
        }, 5000);
    }
  }
  // PUT api
  const completeTodo = async index =>{
      try{
        let idx = newTodos.findIndex(todo=>todo.id===index);
        newTodos[idx].completed=true;
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/"+index,{
            method:"PUT",
            body: JSON.stringify({newTodos}),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });
        console.log("PUT Response",response);
        setTodos(newTodos);
      } catch(err){
        setError(err.toString());
        setTimeout(() => {
          setError("");
        }, 5000);
      }
  }
  // DELETE api
  const deleteTodo = async index =>{
      try{
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/"+index,{
          method:"DELETE"
        });
        console.log("DELETE Response",response);
        let idx = newTodos.findIndex(todo=>todo.id===index);
        newTodos.splice(idx,1);
        setTodos(newTodos);
      } catch(err){
        setError(err.toString());
        setTimeout(() => {
          setError("");
        }, 5000);
      }
  }
  return (
    <div className="app">
    <div>
      <h1>Todo Management with React Hooks and API </h1>
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
export default App;