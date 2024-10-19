import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const List = () => {
    const token=localStorage.getItem("token")
    const decodedToken=jwtDecode(token)
    const [data, setData] = useState([])
    const fetchData = async () => {
        const response = await axios.get(`http://localhost:8082/api/blog?userId=${decodedToken.id}`)
        setData(response.data.blogs)
    }

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:8082/api/blog/${id}`)
        if (response.data.success) {
            toast.success(response.data.message)
            fetchData()
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <Link className='btn btn-primary' to={`/blog/${row._id}`}>U</Link>
                    <button className='btn btn-danger' onClick={() => handleDelete(row._id)}>D</button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <div>



            <DataTable
                columns={columns}
                data={data}
            />
        </div>
    )
}

export default List
