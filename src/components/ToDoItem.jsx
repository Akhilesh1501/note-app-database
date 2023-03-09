import React from "react";
import Supabase from "../supabase";

function ToDoItem(props) {

 let valuen = props.value 
 let newData = props.newSetDataFetch
 let newDataF = props.newDataFetch

  async function deleteItem() {

    
    try {
      const { data,error} = await Supabase
    .from("todos")
    .delete()
    .eq("id",valuen.id)

    newData(newDataF.filter((x) => x.id !== valuen.id))

    if (error) throw error
    // window.location.reload(); 
    }

    catch (error) {
      alert(error.message);
      
    }



  }



  return (
    
    <div onClick={deleteItem}>
      
      <li>{props.text}</li>
    </div>
  );
}

export default ToDoItem;


/* key = (todoItem.id)
          <li onClick={deleteItem}> {todoItem.items} </li> */