import React, { useState, useEffect } from 'react'
import { createTodo } from '../api/task'

const TodoForm = ({ setForm, setTodos, editTodo, onEditSubmit, category }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (editTodo) {
            setTitle(editTodo.title);
            setDescription(editTodo.description || '');
        }
    }, [editTodo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editTodo) {
                await onEditSubmit(editTodo._id, { title, description, category });
            } else {
                const response = await createTodo({ title, description, category });
                setTodos((prev) => [response.data, ...prev]);
                setForm(false);
            }
        } catch (err) {
            console.log('Error submitting todo:', err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center fixed inset-0 backdrop-blur-sm bg-black/30 z-50 p-4'>
            <div className='flex flex-col justify-center items-center gap-4 sm:gap-6 bg-[#2464ce] text-white py-6 sm:py-10 px-5 sm:px-12 md:px-20 w-full max-w-md sm:max-w-lg rounded-2xl'>
                <button className='flex justify-end w-full cursor-pointer' onClick={() => setForm(false)}>X</button>
                <div>
                    <h1 className='font-semibold text-2xl sm:text-3xl'>{editTodo ? 'Edit Todo' : 'To-Do Form'}</h1>
                </div>
                <form onSubmit={submitHandler} className='w-full'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-semibold text-base sm:text-lg'>Todo title</h3>
                            <input type="text" placeholder='Enter title' required className='placeholder:text-gray-500 bg-white p-2 rounded-xl text-black w-full' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-semibold text-base sm:text-lg'>Todo Description</h3>
                            <textarea required rows={6} placeholder='Enter Description' className='placeholder:text-gray-500 bg-white p-2 rounded-xl text-black w-full resize-none' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className='flex justify-center items-center p-2 mt-4'>
                        <button disabled={submitting} className='bg-white text-[#2464ce] font-semibold w-full py-3 sm:py-4 rounded-xl disabled:opacity-50'>
                            {submitting ? 'Saving...' : editTodo ? 'Save Changes' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TodoForm