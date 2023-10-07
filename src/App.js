import { useState ,useEffect } from 'react';
import './App.css';
import {AiFillDelete} from 'react-icons/ai'
import {AiFillCheckCircle} from 'react-icons/ai'
function App() {
  const [isCompleted , setisCompleted]= useState(false);
  const [allToDoList, setallToDoList]= useState([]);
  const [newTitle, setnewTitle]= useState("");
  const [newDescription, setnewDescription]= useState("")
  const [CompletedToDo,setCompletedToDo]= useState([])
  
  const handlerAdd=()=>
  {
    let newtodoItem={
      title:newTitle,
      description:newDescription
    }
    let updateToDolist =[...allToDoList];
    updateToDolist.push(newtodoItem);
    setallToDoList(updateToDolist)
    localStorage.setItem('todoList',JSON.stringify(updateToDolist))
  }
  useEffect(()=>{
    let savedtoDolist= JSON.parse(localStorage.getItem('todoList'))
    let savedcompleted= JSON.parse(localStorage.getItem('CompletedToDo'))
  

    if (savedtoDolist){
      setallToDoList(savedtoDolist)
    }
    if (savedcompleted){
      setallToDoList(savedcompleted)
    }
  },[])
  const handlerDelete= (index) =>
  {
    // clone
    let deleteToDoList=[...allToDoList]
    // edit
   deleteToDoList.splice(index,1)
    // set
   localStorage.setItem('todoList',JSON.stringify(deleteToDoList));
   setallToDoList(deleteToDoList)
  }
  const handlerCheck= (index)=>{
    
      let CompleteOn= 'Completed';
      let filterItem = {...allToDoList[index],CompleteOn:CompleteOn}
let updatedCompleted=[...CompletedToDo];
updatedCompleted.push(filterItem);
setCompletedToDo(updatedCompleted);
handlerDelete(index)
localStorage.setItem('CompletedToDo',JSON.stringify(updatedCompleted));

  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>TO DO LIST</h1>
      <div className='container  px-4'>
     <div className='todo_wrapper'>
    <div className='todo-inputs'>
    <div className="row">
      
      <div className="col">
      <input type="text" value={newTitle} onChange={(e)=>setnewTitle(e.target.value)} class="form-control inputs-items" placeholder="What's your task?" aria-label="What's your task?"/>
      </div>
      <div className="col">
      <input type="text" value={newDescription} onChange={(e)=>setnewDescription(e.target.value)} class="form-control inputs-items " placeholder="Description" aria-label="Description"/>
      </div>
      <div className='col'>
      <button className="btn btn-success" type="button" onClick={handlerAdd}>ADD</button>
      </div>

      {/* "d-inline p-2 m-2 btn btn-secondary text-white" */}
  </div>
    </div>
  <div  className='row'>
        <div className='col'>
          <div className='todo-botton-area p-2'>
          <button class={`isCompleted ${isCompleted===false ?"d-inline p-2 m-2  btn btn-success text-white ":"d-inline p-2 m-2  btn btn-secondery text-white "}`} onClick={()=>setisCompleted(false) }>To Do</button>
          <button class={`isCompleted ${isCompleted===true ?"d-inline p-2 m-2  btn btn-success text-white ":"d-inline p-2 m-2  btn btn-secondery text-white "}`} onClick={()=>setisCompleted(true)}>Completed</button>
          </div>
       
 
        </div>
      </div>
      <div  className='row'>
        <div className='col-12'>
          <div className='todolist'>
           {isCompleted===false && allToDoList.map((item,index)=>{
            return(
              <div className='todolist-items' key={index}>
              <div>
              <h4>{item.title}</h4>
           <p>{item.description}</p>
              </div>
           
          <div className='icon-items' key={index}>
          <AiFillDelete className='icon'onClick={()=> handlerDelete(index)} title='delete?' />
          <AiFillCheckCircle className='check-icon' onClick={()=> handlerCheck(index)} title='Complete?'/>
          </div>
            </div>
            )
           })}
          
          {isCompleted===true && CompletedToDo.map((item,index)=>{
            return(
              <div className='todolist-items' key={index}>
              <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <small>{item.CompleteOn}</small>
              </div>
           
          <div className='icon-items' key={index}>
       
          
          </div>
            </div>
            )
           })}
          </div>
         
          
       </div>
      </div>
      </div> 
     
      </div>
      </header>
    </div>
  );
}

export default App;
