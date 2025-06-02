import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Payment from './components/Payment';
import EmployeePortal from './components/EmployeePortal'; 
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/employee" element={<EmployeePortal />} /> {/* ? new route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
