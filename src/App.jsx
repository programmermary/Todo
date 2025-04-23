import React, { useEffect } from 'react'
import { useState } from 'react'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion'
import { useRef } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState([])
  useEffect(()=>{
    
    const savedTasks = JSON.parse(localStorage.getItem('task'))
    || [] 
    console.log('Loaded tasks:', savedTasks)
    setTasks(savedTasks)
  },[])

  const trashRef = useRef(null)

  const handelSubmit = (e) => {
   const newTask = {text:input,
                    color:getRondomColor(),
                    x:Math.floor(Math.random()*(window.innerWidth-400))
                   }
    const newTasks = [...tasks , newTask]
    e.preventDefault()
    setTasks(newTasks)
    localStorage.setItem('task', JSON.stringify(newTasks)) 

    setInput('')
  }
 
  const handleDrop = (event, draggedTask) => {
    const trash = trashRef.current
    if (!trash) return
  
    const trashBox = trash.getBoundingClientRect()
    const taskBox = event.target.getBoundingClientRect()
  
    const isTouching =
      taskBox.right > trashBox.left &&
      taskBox.left < trashBox.right &&
      taskBox.bottom > trashBox.top &&
      taskBox.top < trashBox.bottom
  
    if (isTouching) {
      const updatedTasks = tasks.filter(task => task !== draggedTask)
      setTasks(updatedTasks)
      localStorage.setItem('task', JSON.stringify(updatedTasks))
    }
  }
  // Function to handle the delete action  

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
      ref={trashRef}
      onClick={handleDelete} 
      className='cursor-pointer hover:text-red-500'
      />
    </Grid>
   <div className='input bg-white h-1/2 w-1/2 flex  justify-center gap-4
   '>
   <form onSubmit={handelSubmit} className='w-full h-full flex 
   '> 
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


   </div>

    <div className='savedValues mt-4 relative w-screen  '>
  {tasks.map((task, index) => (
   <motion.div
   key={index}
   drag
   onDragEnd={(event, info) => handleDrop(event, task)}
   className='absolute p-3 rounded-md text-white shadow-md cursor-grab'
   initial={{ y: -100, opacity: 0 }}
   animate={{ y: window.innerHeight * 0.6 - 50, opacity: 1 }}
   transition={{ duration: 1.2, type: 'spring', delay: index * 0.1 }}
   style={{
     left: `${task.x}px`,
     backgroundColor: task.color,
   }}
 >
   {task.text}
 </motion.div>
  ))}
</div>
    </div>
    </>
  )
}

export default App