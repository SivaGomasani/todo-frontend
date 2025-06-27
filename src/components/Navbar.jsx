

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/all">All Todos</Link>
            <Link to="/get">Todo</Link>
            <Link to="/completed">Completed Todos</Link>
        </div>
    )
}

export default Navbar
