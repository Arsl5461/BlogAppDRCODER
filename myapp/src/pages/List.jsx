import DataTable from 'react-data-table-component';
import React,{useState,useEffect} from 'react'
import axios from 'axios';

const List = () => {
    const [data,setData]=useState([])
    const fetchData=async()=>{
        const response=await axios.get("http://localhost:8082/api/blog")
        setData(response.data.blogs)
    }
    useEffect(()=>{
fetchData();
    },[])
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Description',
            selector: row => row.description,
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
