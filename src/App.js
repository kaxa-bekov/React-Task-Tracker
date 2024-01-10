import {useState, useEffect } from 'react';
import Header from './Components/Header';
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask'

const App = () => {

    // const today = new Date(Date.now()).toLocaleDateString('en-Us', {timezone: 'UTC'});

    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer)
        }

        getTasks();
    },[])

    //Fetch tasks
    const fetchTasks = async () => {
        const data = await fetch('http://localhost:5000/tasks').then(response => response.json());

        return data
    }

    //Fetch Task
    const fetchTask = async (id) => {
        const data = await fetch(`http://localhost:5000/tasks/${id}`).then(response => response.json());

        return data
    }


    //AddTask
    const addtask = async (task) => {
        // const id = Math.floor(Math.random() * 100 + 1);
        // const newTask = {id, ...task};

        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data])
    }

    // console.log(typeof tasks[0].id);

    //Delete Task
    const deleteTask = async (id) => {

        console.log(typeof id);
        // const targetId = id;

        await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'}).then(response => response.json()).then(data => console.log(data))
    
        setTasks(tasks.filter(task => task.id !== id))
    }

    //Toggle Reminder
    const toggleReminder = async (id) => {

        const taskToUpd = await fetchTask(id);

        const updTask = { ...taskToUpd, reminder: !taskToUpd.reminder }
        
        const res = await fetch(`http://localhost:5000/tasks/${id}`,
        {method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
    
        })

        const data = await res.json();


        setTasks(tasks.map(task => {
            return (task.id === id) ? {...task, reminder: data.reminder } : task
            
        }))
    }
  
    return (
      <div className='container'>
  
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        {showAddTask && <AddTask onAdd={addtask} /> }
        
        {tasks.length === 0 ? 'You dont have any tasks' : <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} />}
      </div>
      ) 
  }
  
  export default App;