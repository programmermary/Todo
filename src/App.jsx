import React, { useEffect } from 'react'
import { useState } from 'react'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion'

function App() {
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState([])
  useEffect(()=>{
    
    const savedTasks = JSON.parse(localStorage.getItem('task'))
    || [] 
    console.log('Loaded tasks:', savedTasks)
    setTasks(savedTasks)
  },[])
  const handelSubmit = (e) => {
   const newTask = {text:input,
                    color:getRondomColor(),
                    x:Math.floor(Math.random()*(window.innerWidth-100))
                   }
    const newTasks = [...tasks , newTask]
    e.preventDefault()
    setTasks(newTasks)
    localStorage.setItem('task', JSON.stringify(newTasks)) 

    setInput('')
  }
  const handleDelete = () => {
   
    localStorage.removeItem('task')
    setTasks([])
  }
  const getRondomColor = () =>{
    const color =['#E1341E','#c03f8e' , '#3FC071','#E01C40','#1CE0BC',
      '#E575D2','#75E588']
      return color[Math.floor(Math.random()*color.length)]
  }
  return (
    <>
    <div className='body  w-screen h-screen flex flex-col 
    items-center '>
    <h1 className='font-semibold'>This Is Funny Todo App</h1>
    <Grid className="self-end text-red-800 " size={12}>
      <DeleteSweepIcon 
      onClick={handleDelete} 
      className='cursor-pointer hover:text-red-500'
      />
    </Grid>
   <div className='input bg-white h-1/2 w-1/2 flex justify-center gap-4'>
 <form onSubmit={handelSubmit} className='w-full h-full'> 
 <input type="text"
           name='todo'
           value={input}
           onChange={(e) => setInput(e.target.value)}
           placeholder='Add a new task'
           className='border-2 border-black h-1/8 w-3/4 rounded-md 
           hover:border-[#1ecbe1]'
    />
    <input type="submit" 
           value="submit" 
           className='border-2  h-1/8 w-[20%] rounded-md hover:border-[#1ecbe1]
           bg-[#1ecbe1] text-white hover:text-black hover:bg-white
           hover:transition-all hover:duration-300
           '
           />
 </form>
 <div className='savedValues mt-4 flex flex-col items-center'>
  {tasks.map((task, index) => (
    <motion.div
      key={index}
      initial={{ y: -200, opacity: 0, scale: 0.6 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12, delay: index * 0.1 }}
      className='p-3 rounded-md text-white mb-2 shadow-lg'
      style={{ backgroundColor: task.color }}
    >
      {task.text}
    </motion.div>
  ))}
</div>

   </div>
    </div>
    </>
  )
}

export default App