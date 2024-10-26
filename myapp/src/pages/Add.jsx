import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const Add = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: decodedToken.id,
  });
  const [image, setImage] = useState(null); // State to hold the image file

  const { title, description } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === 'image') {
      setImage(e.target.files[0]); // Set the selected image file
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("userId", formData.userId);
    if (image) {
      data.append("image", image); // Append the image file to FormData
    }

    try {
      const response = await axios.post("http://localhost:8082/api/blog", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setFormData({ title: "", description: "" });
        setImage(null); // Reset the image file
        toast.success(response.data.message);
        navigate("/list");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Form onSubmit={onSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            name="title"
            value={title}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={description}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={onChange}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default Add;
