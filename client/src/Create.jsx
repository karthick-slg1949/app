// import React, { useState } from 'react'

// import axios from 'axios'
// function Create() {
//   const [task, setTask]=useState('');
//   const handleAdd=()=>{
//     axios.post("http://localhost:7001/add",{task:task})
//     .then(() =>window.location.reload())
//     .catch(err=>console.log(err))
//   }
//   return (
//     <div>
//         <input type="text" className='input' placeholder='Enter Task' onChange={(e)=>setTask(e.target.value)}/>
//         <button type='button' className='button' onClick={handleAdd}>Add</button>
//     </div>
//   )
// }

// export default Create
import React, { useState } from 'react';
import axios from 'axios';

function Create() {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (!task.trim()) {
      alert("Task cannot be empty");
      return;
    }

    axios.post("http://localhost:7001/add", { task: task })
      .then(() => {
        setTask(''); 
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        className='input'
        placeholder='Enter Task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type='button' className='button' onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
