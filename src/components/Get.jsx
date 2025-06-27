import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Get() {
    const [todo, setTodo] = useState(null);
    const [id, setId] = useState('');
    const [searched, setSearched] = useState(false); // 👈 tracks if search was triggered

    const handleSubmit = () => {
        if (!id) {
            alert("Please enter a valid ID");
            return;
        }

        setSearched(true); // 👈 mark that search has happened

        fetch(`"https://todo-backend-rcp2.onrender.com/api/todos/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Todo not found");
                }
                return response.json();
            })
            .then(data => setTodo(data))
            .catch(error => {
                console.error(error);
                setTodo(null);
            });
    };

    const handleDelete = (todoId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            fetch(`http://localhost:8081/api/todos/delete/${todoId}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (response.status === 204) {
                        alert("Task deleted successfully");
                        setTodo(null);
                        setId('');
                        setSearched(false); // Reset search state after deletion
                    } else {
                        throw new Error("Failed to delete");
                    }
                })
                .catch(error => {
                    alert("Error deleting task");
                    console.error(error);
                });
        }
    };

    return (
        <>
            <Navbar />
            <div className="get-form" style={{ textAlign: 'center', marginTop: '40px' }}>
                <input
                    type="number"
                    placeholder="Enter Task ID"
                    value={id}
                    onChange={(e) => {
                        setId(e.target.value); setSearched(false);}}
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <button onClick={handleSubmit} style={{ padding: '8px 16px' }}>Get Todo</button>
            </div>

            {todo ? (
                <div className='card' key={todo.id} style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc' }}>
                    <p><strong>Task ID:</strong> {todo.id}</p>
                    <p><strong>Task Name:</strong> {todo.name}</p>
                    <p><strong>Priority:</strong> {todo.priority}</p>
                    <p><strong>Due Date:</strong> {todo.dueDate}</p>
                    <p><strong>Description:</strong> {todo.description}</p>
                    <span>
                        <button className='delete' onClick={() => handleDelete(todo.id)} style={{ marginRight: '10px' }}>Delete</button>
                        <button className='update'>Update</button>
                    </span>
                </div>
            ) : (
                searched && (
                    <p style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
                        No task found with ID: {id}
                    </p>
                )
            )}
            <Footer />
        </>
    );
}

export default Get;
