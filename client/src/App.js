import './App.css';
import {Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Errors from './components/Errors';

function App() {
  return (
    <div className="app">
     <Header/>
     <Routes>
     <Route path="/dashboard" element= {<Dashboard/>} />
     <Route path="/login" element= {<Login/>} />
     <Route path="/register" element= {<Register/>} />
     <Route path='*' element= {<Errors/>}/>
     </Routes>
    </div>
  );
}

export default App;
