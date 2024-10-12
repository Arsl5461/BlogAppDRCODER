import React,{useState} from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [formData,setFormData]=useState({
        title:"",
        description:""
    })
    const {title,description}=formData;
    const navigate=useNavigate()
    const onChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const onSubmit=async(e)=>{
e.preventDefault();
const response=await axios.post("http://localhost:8082/api/blog",formData)
if(response.data.success){
    setFormData({
        title:"",
        description:""
    })
    toast.success(response.data.message)
    navigate("/list")
}

    }
  return (
    <div>
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" name="title" value={title} onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={description} onChange={onChange} />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
    </div>
  )
}

export default Add
