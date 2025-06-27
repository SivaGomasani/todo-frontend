import { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

function Home() {
    const [clicked, setClicked] = useState(false);
    const [list, setList] = useState({
        id:'',
        name: '',
        description: '',
        duedate: '',
        priority: ''
    });

    const handleChange = (e) => {
        setList({ ...list, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://todo-backend-rcp2.onrender.com/api/todos/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(list)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to add todo. Status: ${response.status}`);
        }
    })
    .then(data => {
        console.log("Todo added:", data);
        setList({
            id: '',
            name: '',
            description: '',
            duedate: '',
            priority: ''
        });
        alert("Todo item added successfully!");
    })
    .catch(error => {
        console.error("Error details:", error);
        alert("Todo list not created");
    });
};


    return (
        <>
            <Navbar />
            <div className='home'>
                <button onClick={() => setClicked(true)} className='btn'>Create Todo List</button>
                {clicked && (
                    <form onSubmit={handleSubmit}>
                        <h1>Todo List Form</h1>

                         <label htmlFor='id'>Task ID:</label>
                        <input
                            type="text"
                            name="id"
                            id="id"
                            placeholder='Enter Task ID:'
                            value={list.id}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor='name'>Task Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder='Enter Task Name'
                            value={list.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor='description'>Description:</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder='Describe the task'
                            value={list.description}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor='dueDate'>Due Date:</label>
                        <input
                            type="date"
                            name="duedate"
                            id="duedate"
                            value={list.duedate}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor='priority'>Priority:</label>
                        <select
                            name="priority"
                            id="priority"
                            value={list.priority}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        <button type='submit'>Create</button>
                    </form>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Home;
