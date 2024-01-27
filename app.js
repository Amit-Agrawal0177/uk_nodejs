const express = require('express')
const mongoose = require('mongoose')
const cors =require('cors')
const app = express();
const dbUrl ='<connection-url>';
const PORT = 8200;

app.use(cors());
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("DB Connected");
}).catch((error)=> {
    console.log("error",error );
})
app.use('/map', require("./mapRoutes/routes"))

app.listen(PORT, ()=>{
    console.log(`server started  at port ${PORT}`);
})