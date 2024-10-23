import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, Stack } from '@mui/material';
import  {useNavigate} from 'react-router-dom';
import axios from 'axios'   
import Navbar from './Navbar';
import axiosInstance from '../axiosinterceptor';
const Home = () => {
    const user = localStorage.getItem("userName");
  const [inputs ,setInputs] = useState([])
  const navigate = useNavigate()
  function updateEmp(emp){
    navigate('/add',{state:{emp}})
  }
  let deleteEmp =(p)=>{
   

    axiosInstance.delete('http://localhost:3000/emp/deleteEmp/'+p).then((res)=>{
      window.location.reload()
    }

    ).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(() => {
    axiosInstance.get('http://localhost:3000/emp/')
        .then((res) => {
            setInputs(res.data); 
        })
        .catch((error) => {
            console.error("Error fetching data: ", error); 
        });
}, []);

  return (
<> 
<Navbar/>
    <div>
        {/* Welcome {user} */}
    </div>
    
    <Container>
            <Grid container spacing={8}>    
                {inputs.map((input) => (
                    <Grid item key={input._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                // component="img"
                                // height="200"
                                // image={input.courseImageurl}
                                // alt={input.title}
                                // style={{ objectFit: 'contain' }} 
                            />
                            <CardContent>
                            <Typography variant="h6" component="div">
                                    {input.empId}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    {input.empName}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    {input.empDesignation}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    {input.empDepartment}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    {input.empLocation}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    {input.empSalary}
                                </Typography>

                                <Stack direction="row" spacing={4}>
                                <Button  variant="contained" color="success" onClick={()=>{updateEmp(input)}} >Edit</Button>

                                <Button  variant="contained" color="error" onClick={()=>{deleteEmp(input._id)}} >Delete</Button>

                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
        </>
  )
}

export default Home