import React from 'react'
import DeleteDialog from './DeleteDialog'
import axios from 'axios';
import { toast } from 'react-toastify';
import EditModal from './EditModal';

const TodoList = ({ tasks, setTasks }) => {

  const handleTaskCompletion = async (task) => {
    const response = await axios.put(`/update/${task.id}`, {
      ...task,
      completed: !task.completed,
    });

    if (response.status === 200) {
      const updatedTasks = tasks.map(task => {
        if (task.id === response.data.updatedTask.id) {
          return response.data.updatedTask;
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  };

  const handleDeleteTask = async (id) => {
    const response = await axios.delete(`/delete/${id}`);

    if (response.status === 200) {
      // Remove the deleted task from the tasks array
      const updatedTasks = tasks.filter((task) => task.id !== id);

      toast.success(`${response.data.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTasks(updatedTasks);
    }
  }

  return (
    <>
      {
        tasks && tasks.length > 0 ?
          <ul className="flex flex-col gap-5 overflow-y-auto pb-5">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`flex items-center gap-5 bg-white p-5 rounded-lg ${task.completed ? 'text-gray-400 line-through' : ''}`}
              >
                <div>
                  <button type="button" onClick={() => handleTaskCompletion(task)} className={`rounded-full w-6 h-6 border border-black flex justify-center items-center cursor-pointer hover:opacity-75 focus:ring-1 focus:ring-offset-1 focus:border-blue-500 ${task.completed ? 'bg-blue-500 text-white border-transparent' : ''}`}>
                    <svg fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 break-all">
                  <p className="text-base font-semibold">
                    {task.title}
                  </p>
                  <p className="text-sm">
                    {task.description}
                  </p>
                </div>
                <div className='flex gap-2 mb-auto'>
                  <EditModal task={task} tasks={tasks} setTasks={setTasks} />
                  <DeleteDialog handleDeleteTask={handleDeleteTask} task={task} />
                </div>
              </li>
            ))}
          </ul>
          :
          <div>
            <div className="text-center">
              <p className="text-gray-700">Try adding some tasks, to see them here.</p>
            </div>
          </div>
      }
    </>
  )
}

export default TodoList