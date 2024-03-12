import { useEffect, useRef, useState } from "react"
import "./styles.css";
import Display from "./Display";


type TInput = {
    a:string,
    b:string,
    c:string
}


function Task(){
    const [input, setInput] = useState('');
    const [form, setForm] = useState(false);
    const [tasks, setTasks] = useState<TInput[]>([])
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);


    useEffect(()=>{
        inputRef.current?.focus()
    },[]);

    const handleClick = () =>{
        setForm(!form)
    }
    const displayForm = {display: form ? 'flex':'none'}

    const resetInput = () => {
        setInput('');
    }

    const addTasks = () => {
        const currentTime = new Date().toLocaleTimeString();
        const currentDate = new Date().toLocaleDateString();   

        if(editIndex !== null){
            tasks[editIndex].a = input;
            setEditIndex(null);
        }   
        else{
            const taskObj:TInput = {
                a:input,    
                b:currentTime,
                c:currentDate,
            }
            setTasks([...tasks, taskObj])
        }
        resetInput();
    }


    const editTask = (index:number) =>{
        const returnTask = tasks[index];
        setInput(returnTask.a)
        setEditIndex(index);
        inputRef.current?.focus();
    }

    const deleteTask = (index:number) => {
        const delTask = [...tasks];
        delTask.splice(index, 1);
        setTasks(delTask)
    }

    return(
        <>
            <div className="container">
            <div className="heading">
              <h1>TODO LIST</h1>
            </div>
            <div className="buttons">
              <button onClick={handleClick}>Add Task</button>
              <select>
                  <option value="">All</option>
              </select>
            </div>
            <div className='form' style={displayForm}>
              <h3>Add task:</h3>
              <input type='text' placeholder='Enter your task here' id='task'onChange={(e)=>setInput(e.target.value)} ref={inputRef} value={input}/>
              <button onClick={addTasks}>Submit</button>
            </div>
            <div className="display">
              <table style={{width:'100%'}}>
                <tbody id='displayTask'>    
                  {/* {tasks.map((item,index) => (
                    <tr key={index}>
                        <td>
                          {item.a} 
                          <sub>   {item.c}</sub>
                          <sub>   {item.b}</sub>
                        </td>
                      <td><button id='e-btn' onClick={()=> editTask(index)}>Edit</button><button id='d-btn' onClick={()=>deleteTask(index)}>Delete</button></td>
                    </tr>
                  ))} */}
                  <Display task={tasks} deleteTask={deleteTask} edit={editTask}/>
                </tbody>
              </table>
            </div>
          </div>
        </>
    )
}


export default Task