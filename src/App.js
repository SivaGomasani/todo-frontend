import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Lists from './components/Lists';
import Completed from './components/completed';
import Get from './components/Get';
import Update from './components/Update';

function App() {
  return (
    <BrowserRouter basename="/todo-frontend">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get" element={<Get />} />
        <Route path="/all" element={<Lists />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
