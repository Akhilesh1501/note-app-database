import React, { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import Supabase from "../supabase";
import { FunctionsFetchError } from "@supabase/supabase-js";

function App() {


  const [todos, setTodos] = useState([])
  const [newTaskText, setNewTaskText] = useState("");
  
  const [inputError, setInputError] = useState("");

  
  

  function handleChange(event) {
    const newValue = event.target.value;
    setNewTaskText(newValue);
  }

  

  useEffect( () => {
    const allData = async () => {
      let {data:todos ,error} =  await Supabase
        .from ('todos')
        .select("*")
        .order('id', {ascending : true})
        
        if (error)  console.log("error",error)
      else setTodos(todos) 
     
      
    };
    allData();
  }, [Supabase]);




  async function submitToDB(taskText)
  {
    // taskText.preventDefault()
    let task = taskText.trim()
    if (task.length) {
    
      const { data: todo,error} = await Supabase
      .from("todos")
      .insert({items: task})
      .select()
      .single();

      if (error) {setInputError(error.message)}
      else setTodos([...todos,todo])
          setNewTaskText('');
      

      // window.location.reload();
    }
  }

  return (

    <div className="container">
    <div className="heading">
      <h1>To-Do List</h1>
    </div>
    
    <div className="form">
    <form onSubmit={(e) => { e.preventDefault() 
                              submitToDB(newTaskText)} }>
      <input onChange={handleChange} type="text" value={newTaskText} />
      <button> <span>Add</span> </button>
      </form>
    </div>



    <div>
      <ul >
        {todos.map((todoItem, index) => (
          
      <ToDoItem
            newDataFetch = {todos}
            newSetDataFetch = {setTodos}
            value = {todoItem}
            key={todoItem.id}
            text={todoItem.items}
          
          />
          
        ))
        }
      </ul>
    </div>
  </div>

  );
}

export default App;
