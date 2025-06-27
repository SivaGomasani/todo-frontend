import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Completed() {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://todo-backend-rcp2.onrender.com/api/todos/completed")
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
                           
                        </div>
                    ))
                ) : (
                    <h1 className='error'>No Tasks are Completed yet!</h1>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Completed;
