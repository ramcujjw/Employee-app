import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from './Navbar';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import axiosInstance from '../axiosinterceptor';
const Add = () => {
  const navigate = useNavigate()
  const [form, setForm]=useState({
    
    empId : '',
    empName : '',
    empDesignation: '',
    empDepartment : '',
    empLocation :'',
    empSalary:''
    


  })
  const onInputChange = (e) => {
    setForm({ ...form,[e.target.name]: e.target.value });
  };
  const location = useLocation()
  let sendData=()=>{
    if(location.state!= null){
      axiosInstance.put('http://localhost:3000/emp/editEmp/'+location.state.emp._id,form).then((res)=>{
        alert('Data updated');
        navigate('/home')
      }).catch((error)=>{
        console.log(error);
      })
    }
    else{
      axiosInstance.post('http://localhost:3000/emp/add',form).then((res)=>{
        navigate('/home')
      }).catch((error)=>{
        console.log(error)
      })
    }
  }
  useEffect(()=>{
    if(location.state!=null){
      setForm({...form,
        
        enpId:location.state.emp.empId,
        empName:location.state.emp.empName,
        empDesignation:location.state.emp.empDesignation,
        empDepartment:location.state.emp.empDepartment,
        empLocation:location.state.emp.empLocation,
        empSalary:location.state.emp.empSalary,

      })
    }
  },[])
  
  return (
    <>
    <Navbar/>
    <div>
       <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="id" variant="outlined" name="empId" value={form.empId} onChange={onInputChange} /><br />
      <TextField id="outlined-basic" label="name" variant="outlined" name="empName" value={form.empName} onChange={onInputChange}/><br />
      <TextField id="outlined-basic" label="Designation" variant="outlined" name="empDesignation" value={form.empDesignation} onChange={onInputChange}/> <br />
      <TextField id="outlined-basic" label="Department" variant="outlined" name="empDepartment"  value={form.empDepartment} onChange={onInputChange}/> <br />
      <TextField id="outlined-basic" label="Location" variant="outlined" name="empLocation" value={form.empLocation} onChange={onInputChange}/> <br />
      <TextField id="outlined-basic" label="Salary" variant="outlined" name="empSalary" value={form.empSalary} onChange={onInputChange} /><br />
      <Button variant="contained" onClick={sendData}>Submit</Button>
      
    </Box>
    </div>
    </>
  )
}

export default Add