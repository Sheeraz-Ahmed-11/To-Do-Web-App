import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { getTodo, completeTodo } from '../api/task'

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const [myDay, important, planned, tasks] = await Promise.all([
          getTodo('My Day'),
          getTodo('Important'),
          getTodo('Planned'),
          getTodo('Tasks'),
        ]);
        const allTodos = [
          ...myDay.data,
          ...important.data,
          ...planned.data,
          ...tasks.data,
        ];
        setTodos(allTodos);
      } catch (err) {
        console.log('Error message:', err);
        setError('Failed to fetch todos.');
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, []);

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

  return (
    <div>
      <div className='sticky top-0 z-50'>
        <Navbar />
      </div>

      <div className="flex gap-2 sm:gap-4">
        <div className='sticky top-16 sm:top-18 h-screen overflow-y-auto shrink-0'>
          <Sidebar />
        </div>

        <main className="flex-1 p-4 sm:p-6 md:p-10 min-w-0 rounded-l-3xl shadow-[-4px_0px_8px_3px_rgba(0,0,0,0.15)]">

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-5 sm:mb-8">My Todos</h1>

          {loading && (
            <div className="flex items-center gap-3 text-gray-500">
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              <span>Loading todos...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {!loading && !error && todos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-1">No todos yet</h2>
            </div>
          )}

          {!loading && !error && todos.length > 0 && (
            <div className="flex flex-col gap-4">
              {todos.map((todo) => (
                <div key={todo._id} className={`bg-white shadow-[2px_2px_6px_4px_rgba(150,150,150,0.5)] rounded-xl border p-3 sm:p-5 flex items-start gap-3 sm:gap-4 transition-all duration-200 hover:shadow-md ${todo.isCompleted ? 'opacity-60 border-green-200' : 'border-gray-200'}`}>

                  <div className={`mt-1 w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-xs ${todo.isCompleted ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                    {todo.isCompleted ? '✓' : '✕'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-gray-800 text-sm sm:text-base truncate ${todo.isCompleted ? 'line-through text-gray-400' : ''}`}>
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">{todo.description}</p>
                    )}
                  </div>

                  <span className="text-xs font-medium shrink-0">
                    {todo.isCompleted ? (
                      <p className='bg-green-100 text-green-700 px-2 py-1 rounded-full'>Done</p>
                    ) : (
                      <div className='flex flex-col gap-2 items-center'>
                        <p className='text-gray-600 text-xs hidden sm:block'>{todo.category}</p>
                        <p className='bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-center'>Pending</p>
                        <button onClick={() => handleComplete(todo._id)} className='bg-green-500 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded cursor-pointer hover:bg-green-600 transition-colors text-xs sm:text-sm'>Complete</button>
                      </div>
                    )}
                  </span>

                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default Home