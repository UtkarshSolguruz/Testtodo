type TInput = {
    a:string,
    b:string,
    c:string
}

type TProps = {
    task: TInput[],
    edit: (index:number)=>void,
    deleteTask: (index:number)=>void
}

export default function Display({task, edit, deleteTask}:TProps){
    return(
        <>
            {task.map((item,index:number)=>(
                    <tr key={index}>
                        <td>
                          {item.a} 
                          <sub>   {item.c}</sub>
                          <sub>   {item.b}</sub>
                        </td>
                      <td><button id='e-btn' onClick={()=> edit(index)}>Edit</button><button id='d-btn' onClick={()=>deleteTask(index)}>Delete</button></td>
                    </tr>
                  ))}
        </>
    );
}