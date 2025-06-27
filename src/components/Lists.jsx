import React, { useEffect, useState} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import '../static/styles.css'

function Lists() {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://todo-backend-rcp2.onrender.com/api/todos/")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => setLists(data))
            .catch(error => {
                alert("Error fetching data");
                console.error("Fetch error:", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            fetch(`https://todo-backend-rcp2.onrender.com/api/todos/delete/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.status === 204) {
                        alert("Task deleted successfully!");
                        fetchData(); // Refresh list
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

    const navigate = useNavigate()

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    }


    return (
        <>
            <Navbar />
            <div className='lists'>
                {lists.length > 0 ? (
                    lists.map((list) => (
                        <div className='card' key={list.id}>
                            <p><strong>Task ID:</strong> {list.id}</p>
                            <p><strong>Task Name:</strong> {list.name}</p>
                            <p><strong>Priority:</strong> {list.priority}</p>
                            <p><strong>Due Date:</strong> {list.duedate}</p>
                            <p><strong>Description:</strong> {list.description}</p>
                            <span>
                                <button className='delete' onClick={() => handleDelete(list.id)}>Delete</button>
                                <button className='update' onClick={() => handleUpdate(list.id)}>Update</button>
                            </span>
                        </div>
                    ))
                ) : (
                    <h1 className='error'>Tasks are not created yet!</h1>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Lists;
