const express = require('express');
const cors = require('cors');
const app = new express();
app.use(cors())

require('dotenv').config()
const PORT = process.env.PORT

const courseRoutes = require('./routes/courseRoutes')
const user_route=require('./routes/user')
app.use('/course',courseRoutes)
require('./db/connection');
app.use("/user",user_route)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})