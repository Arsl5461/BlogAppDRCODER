import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchProducts } from '../features/products/productSlice'
import Loader from './Loader'
import "./Checkout.css"

const Checkout = () => {
    const dispatch=useDispatch();
    const products=useSelector((state)=>state.products.items)
    const status=useSelector((state)=>state.products.status)
    const error=useSelector((state)=>state.products.error)
    useEffect(()=>{
if(status === "idle"){
    dispatch(fetchProducts())
}
    },[status,dispatch])
    if(status === "loading"){
        return <Loader/>
    }
    if (status === 'failed') {
        return <p>{error}</p>;
      }
  return (
    <div className='d-flex justify-content-center align-items-center flex-wrap'>
      {
        products.map((item)=>{
            return(
        
                <div className='card'>
                <h1>{item.title}</h1>
                <img src={item.image} height={"100px"} width={"100px"}/>
                <p>{item.description}</p>
                </div>
            )
        })
      }
    </div>
  )
}

export default Checkout
