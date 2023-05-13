<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = session('tasks');
        return Inertia::render('App', [
            'todos' => $todos,
          ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $task = [
            'id' => uniqid(),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'completed' => false,
        ];

        // Retrieve existing tasks from session or create empty array
        $tasks = session('tasks', []);

        // Add the new task to the list of tasks
        $tasks[] = $task;

        // Store the updated task list in the session
        session(['tasks' => $tasks]);

        $response = [
            'message' => "Task added successfully!",
            'newTask' => $task,
        ];

        // Return the newly created task to the client
        return response()->json($response);
    }


    public function getTodo() 
    {
        $tasks = session()->get('tasks', []);
        return response()->json($tasks);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Retrieve existing tasks from session or create empty array
        $tasks = session('tasks', []);

        // Find the task with the specified ID
        $index = array_search($id, array_column($tasks, 'id'));

        if ($index !== false) {
            // Update the task
            $tasks[$index]['title'] = $request->input('title');
            $tasks[$index]['description'] = $request->input('description');
            $tasks[$index]['completed'] = $request->input('completed');

            // Store the updated task list in the session
            session(['tasks' => $tasks]);

            $response = [
                'message' => "Updated successfully!",
                'updatedTask' => $tasks[$index],
            ];

            // Return the updated task to the client
            return response()->json($response);
        } else {
            // Task with specified ID not found
            $response = [
                'message' => "Task with ID $id not found!",
            ];

            // Return error message to the client
            return response()->json($response, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Retrieve existing tasks from session or create empty array
        $tasks = session('tasks', []);

        // Find the task with the specified ID
        $index = array_search($id, array_column($tasks, 'id'));

        if ($index !== false) {
            // Remove the task from the task list
            array_splice($tasks, $index, 1);

            // Store the updated task list in the session
            session(['tasks' => $tasks]);

            $response = [
                'message' => "Task deleted successfully.",
            ];

            // Return success message to the client
            return response()->json($response);
        } else {
            // Task with specified ID not found
            $response = [
                'message' => "Task with ID $id not found!",
            ];

            // Return error message to the client
            return response()->json($response, 404);
        }
    }

}
