import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { Routes,Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   <>
   <Navbar/>
   <Routes>
    <Route path='/add' element={<Add/>}/>
    <Route path='/list' element={<List/>}/>

   </Routes>
   <ToastContainer/>
   </>
  );
}

export default App;
