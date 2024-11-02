import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Add from './pages/Add';
import List from './pages/List';
import Update from './pages/Update';
import Login from './pages/Login'; // Import your Login component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from './components/Products';
import Checkout from './components/Checkout';

function App() {
  const location = useLocation();
  console.log(location) // Get the current location (URL)
  const token = localStorage.getItem('token'); // Check if a token exists in localStorage

  // Redirect to Login page if token does not exist and the user is not already on the login page
  if (!token && location.pathname !== '/login') {
    return <Navigate to='/login' />;
  }

  return (
    <>
      {token && <Navbar />}
      <Routes>
        <Route path='/add' element={token ? <Add /> : <Navigate to='/login' />} />
        <Route path='/list' element={token ? <List /> : <Navigate to='/login' />} />
        <Route path='/blog/:id' element={token ? <Update /> : <Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
