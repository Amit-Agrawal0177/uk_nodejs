const express = require('express')
const mongoose = require('mongoose')
const cors =require('cors')
const app = express();
const dbUrl ='mongodb://9930i:Mongo%40Mole@45.79.122.168:6665/mole_uk?authSource=admin&readPreference=primary&ssl=false';
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