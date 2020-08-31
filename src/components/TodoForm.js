import React, {useState} from 'react';

function TodoForm({addTodo}){
    const [value,setValue]=useState("");
    const handleSubmit =e=>{
      e.preventDefault();
      if(!value) return;
      addTodo(value);
      setValue("");
      setTimeout(() => {
      var elem = document.getElementById('todoData');
      elem.scrollTop = elem.scrollHeight;
      }, 1000);
    }
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add your todo here..." className="input" value={value} onChange={e=>setValue(e.target.value)}/>
      </form>
    )
}
export default TodoForm;