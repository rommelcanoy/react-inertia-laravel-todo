import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoAdd from "../components/TodoAdd";
import TodoList from "../components/TodoList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/get-todo')
      .then(response => {
        setTasks(response.data.reverse());
        console.log('response data', response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <div className="App bg-gray-100 flex justify-center h-screen items-center px-3 md:p-0">
        <div className="max-w-screen-sm w-full flex flex-col gap-5 h-full overflow-hidden pt-5">
          <div className="">
            <h1 className="text-xl font-semibold text-center">To-Do List</h1>
          </div>

          <div className="">
            <div className="bg-white top-5 p-5 rounded-xl">
              <TodoAdd tasks={tasks} setTasks={setTasks} />
            </div>
          </div>
          <TodoList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </>
  );
}

export default App;
