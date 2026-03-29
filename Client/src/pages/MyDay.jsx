import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TodoForm from '../components/TodoForm'
import { completeTodo, deleteTodo, getTodo, updateTodo } from '../api/task'

const MyDay = () => {

    const now = new Date()

    const [form, setForm] = useState(false);
    const [todos, setTodos] = useState([]);
    const [editTodo, setEditTodo] = useState(null);
    const [editForm, setEditForm] = useState(false);

    const day = now.toLocaleDateString('en-US', { weekday: 'long' })
    const date = now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    });

    const handleComplete = async (id) => {
        try {
            await completeTodo(id, { isCompleted: true });
            setTodos((prev) =>
                prev.map((todo) =>
                    todo._id === id ? { ...todo, isCompleted: true } : todo
                )
            );
        } catch (err) {
            console.log('Error completing todo:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            setTodos((prev) => prev.filter((todo) => todo._id !== id));
        } catch (err) {
            console.log('Error deleting todo:', err);
        }
    };

    const handleEdit = (todo) => {
        setEditTodo(todo);
        setEditForm(true);
    };

    useEffect(() => {
        const getTodos = async () => {
            try {
                const response = await getTodo('My Day');
                setTodos(response.data);
            } catch (err) {
                console.log('Error message:', err);
            }
        }
        getTodos();
    }, [])

    const handleEditSubmit = async (id, updatedData) => {
        try {
            const response = await updateTodo(id, updatedData);
            setTodos((prev) =>
                prev.map((t) => t._id === id ? response.data : t)
            );
            setEditForm(false);
            setEditTodo(null);
        } catch (err) {
            console.log('Error editing todo:', err);
        }
    };

    return (
        <div>
            <div className='sticky top-0 z-50'>
                <Navbar />
            </div>
            <div className='flex gap-2 sm:gap-4'>
                <div className='sticky top-16 sm:top-18 h-screen overflow-y-auto shrink-0'>
                    <Sidebar />
                </div>
                <div className='flex-1 min-w-0 p-4 sm:p-6 md:p-10 flex flex-col gap-4 rounded-l-3xl shadow-[-4px_0px_8px_3px_rgba(0,0,0,0.15)] h-screen overflow-y-auto'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl'>My Day</h1>
                        <p className='text-sm sm:text-base'>{day}, {date}</p>
                    </div>

                    <div>
                        <button className='bg-[#2464ce] text-white font-semibold px-4 sm:px-6 py-2 cursor-pointer text-sm sm:text-base' onClick={() => setForm(true)}>➕ Create New</button>
                    </div>

                    <div className="flex flex-col gap-4 w-full">
                        {todos.map((todo) => (
                            <div key={todo._id} className={`bg-white shadow-[2px_2px_6px_4px_rgba(150,150,150,0.5)] rounded-xl border p-3 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 transition-all w-full duration-200 hover:shadow-md ${todo.isCompleted ? 'opacity-60 border-green-200' : 'border-gray-200'}`}>

                                <div className={`mt-1 w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-xs ${todo.isCompleted ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                                    {todo.isCompleted ? '✓' : '✕'}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-semibold text-gray-800 text-sm sm:text-base ${todo.isCompleted ? 'line-through text-gray-400' : ''}`}>
                                        {todo.title}
                                    </h3>
                                    {todo.description && (
                                        <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">{todo.description}</p>
                                    )}
                                </div>

                                <div className='flex flex-wrap items-center gap-2 shrink-0'>
                                    {todo.category && (
                                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full inline-block">
                                            {todo.category}
                                        </span>
                                    )}

                                    {todo.isCompleted ? (
                                        <span className='bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full'>Done</span>
                                    ) : (
                                        <span className='bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full'>Pending</span>
                                    )}

                                    {!todo.isCompleted && (
                                        <button onClick={() => handleComplete(todo._id)} className='bg-green-500 text-white text-xs px-3 py-1 rounded cursor-pointer hover:bg-green-600 transition-colors'>
                                            ✓ Complete
                                        </button>
                                    )}

                                    <button onClick={() => handleEdit(todo)} className='bg-blue-500 text-white text-xs px-3 py-1 rounded cursor-pointer hover:bg-blue-600 transition-colors'>
                                        ✎ Edit
                                    </button>

                                    <button onClick={() => handleDelete(todo._id)} className='bg-red-500 text-white text-xs px-3 py-1 rounded cursor-pointer hover:bg-red-600 transition-colors'>
                                        🗑 Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {form && (
                <TodoForm setForm={setForm} setTodos={setTodos} category="My Day" />
            )}

            {editForm && editTodo && (
                <TodoForm setForm={setEditForm} setTodos={setTodos} editTodo={editTodo} onEditSubmit={handleEditSubmit} category="My Day" />
            )}
        </div>
    )
}

export default MyDay