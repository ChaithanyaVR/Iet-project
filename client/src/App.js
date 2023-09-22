import './App.css';
import { Routes, Route, IndexRoute, Navigate } from "react-router-dom";
import IetPage from './Pages/IetPage';
import VerificationPage from './Pages/VerificationPage';

function App() {
  return (
    <div className="App">
     <Routes>
    <Route path='/' element={<IetPage/>}/>
    <Route path='/verify/:token' element={<VerificationPage/>} />
     </Routes>
    </div>
  );
}

export default App;
