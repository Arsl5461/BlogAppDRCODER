import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchProducts } from '../features/products/productSlice';
import Loader from './Loader';
import { toast } from 'react-toastify';


const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchProducts());
        }
      }, [status, dispatch]);
    
      if (status === 'loading') {
        return <Loader/>;
      }
    
      if (status === 'failed') {
        return toast.dark(error);
      }
      return (
        <div>
          <h2>Products</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
      );
    };

export default Products
