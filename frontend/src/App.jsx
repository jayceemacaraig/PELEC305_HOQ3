import {useState, useEffect} from 'react'
import { TaskApi } from './utils/Api'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({title: '', is_completed: false})

  useEffect(() => {
    TaskApi.list().then(res => res.data).then(data => {
      console.log(data)
      setTasks(data)})
  }, [])

  const handleCreateTask = async (task) => {
    try {
      const response = await TaskApi.create(task)
      setTasks([...tasks, response.data])
      setNewTask({title: '', is_completed: false})
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskApi.delete(taskId)
      setTasks(tasks.filter(task => task.id !== taskId))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const handleUpdateTask = async (taskId) => {
    try {
      const response = await TaskApi.update(taskId, {is_completed: !tasks.find(task => task.id === taskId).is_completed})
      console.log(response.data)
      setTasks(tasks.map(task => task.id === taskId ? response.data : task))
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-4 p-4'>
      <div className='flex flex-col p-4 border border-gray-200 rounded-xl gap-5 w-4/5 md:w-3/5 lg:w-2/5'>
      <h1 className='tracking-tighter text-5xl font-bold'>Task Management</h1>
      
      <form onSubmit={(e) => {
        e.preventDefault()
        handleCreateTask(newTask)
      }} className='my-5 flex items-center justify-between gap-2'>
        <input 
          type="text" 
          placeholder="Enter your task..." 
          className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full' 
          value={newTask.title}
          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
        />
        <button type="submit" className='bg-blue-500 text-white font-semibold py-2 px-5  rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>Create</button>
      </form>

      <div className='flex flex-col gap-3'>
        <h1 className='tracking-tighter text-4xl font-bold'> {tasks.length} Tasks:</h1>
        {tasks.length === 0 ? (
          <p className='text-gray-400 text-center font-semibold'>No tasks available. Create a new task to get started!</p>
        ) : (
        tasks.map((task) => (
          <div key={task.id} className='border border-gray-300 rounded-md p-3 flex items-center justify-between gap-3'>
            <h2 className={`text-lg font-semibold ${task.is_completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h2>

            <div className='flex items-center gap-2'>
              <div className={`${task.is_completed ? 'bg-green-500' : 'bg-yellow-400'} w-4 h-4 rounded-full`}></div>
              <p className='text-sm text-gray-500'>{task.is_completed ? 'Completed' : 'Pending'}</p>  
            </div>


            <div className='flex gap-2 items-center'>
              <button onClick={() => handleUpdateTask(task.id)} className={`text-white font-semibold py-1 px-3 rounded-md ml-2 ${task.is_completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 '}`}>{task.is_completed ? 'Mark as Pending' : 'Mark as Completed'}</button>
              <button onClick={() => handleDeleteTask(task.id)} disabled={task.is_completed} className={` text-white font-semibold py-1 px-3 rounded-md ml-2 ${task.is_completed ? 'bg-gray-500 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'}`}>Delete</button>
            </div>
          </div>
        ))
        )}

        </div>

      </div>
    </div>
  )
}

export default App
