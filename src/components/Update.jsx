import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../static/styles.css';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({ name: '', description: '', duedate: '', priority: '' });

    useEffect(() => {
        fetch(`https://todo-backend-rcp2.onrender.com/api/todos/${id}`)
            .then(res => res.json())
            .then(data => setTask(data))
            .catch(err => console.error("Failed to fetch task", err));
    }, [id]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`"https://todo-backend-rcp2.onrender.com/api/todos/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        })
        .then(res => {
            if (res.ok) {
                alert("Task updated successfully!");
                navigate('/all');
            } else {
                throw new Error("Update failed");
            }
        })
        .catch(err => {
            alert("Update error");
            console.error(err);
        });
    };

    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit} className='update-form' >
                <h2>Update Task</h2>
                
                        <label htmlFor='name'>Task Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder='Enter Task Name'
                            value={task.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor='description'>Description:</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder='Describe the task'
                            value={task.description}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor='dueDate'>Due Date:</label>
                        <input
                            type="date"
                            name="duedate"
                            id="duedate"
                            value={task.duedate}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor='priority'>Priority:</label>
                        <select
                            name="priority"
                            id="priority"
                            value={task.priority}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                <button type="submit">Update Task</button>
            </form>
            <Footer />
        </>
    );
}

export default Update;