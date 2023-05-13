import React from 'react'
import { useForm } from "react-hook-form"
import axios from "axios";
import { toast } from 'react-toastify';

const TodoAdd = ({ tasks, setTasks, type = 0, task, closeModal }) => {
  const { register, handleSubmit, reset, formState: {
    errors
  } } = useForm({
    defaultValues: {
      title: task ? task.title : "",
      description: task ? task.description : "",
    }
  });

  const onSubmit = async (payload) => {
    if (type === 0) {
      const response = await axios.post("/store", payload);
      if (response.status === 200) {
        setTasks([response.data.newTask, ...tasks]);
        console.log(response.data);
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
      }
      reset();
    } else {
      const response = await axios.put(`/update/${task.id}`, {
        ...task, ...payload
      });

      if (response.status === 200) {

        console.log('response update task', response.data);
        const updatedTask = response.data.updatedTask;
        setTasks(tasks.map(task => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          }
          return task;
        }));

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
      }

      closeModal();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            {...register('title', { required: "Title is required.", minLength: { value: 4, message: "Min length is 4" } })}
            type="text"
            className={`block w-full p-2 text-gray-900 border-gray-300 rounded-lg bg-gray-100 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.title?.message ? 'border-red-500 focus:border-red-500' : ''}`}
            placeholder="Title"
          // value={newTask.title}
          // onChange={handleTitleChange}
          />
          <p className='text-red-500 text-sm'>{errors.title?.message}</p>
        </div>
        <div>
          <textarea
            {...register('description', { required: "Description is required.", minLength: { value: 4, message: "Min length is 4" } })}
            type="text"
            placeholder="Description"
            className={`block w-full p-2 text-gray-900 border-gray-300 rounded-lg bg-gray-100 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.description?.message ? 'border-red-500 focus:border-red-500' : ''}`}
          // value={newTask.description}
          // onChange={handleDescriptionChange}
          ></textarea>
          <p className='text-red-500 text-sm'>{errors.description?.message}</p>
        </div>
        {
          type === 0 ?

            <div className='flex justify-end'>
              <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5'>Add Task</button>
            </div>

            :

            <div className="mt-2 flex gap-2 justify-end">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Save Changes
              </button>
            </div>

        }
      </form>
    </>
  )
}

export default TodoAdd