const express = require('express');
const app = express();

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});

const add = function(x,y){
    return x+y;
}

app.get('/',(req, res)=>{
    res.send('Hello, World!');
});

app.get('/fun',(req, res)=>{
    res.send('Express is Fun');
});

app.get('/getChad', (req, res) => {
  res.sendFile('E:/Software-Engineering-Study/5th-Semester/Lab/Server-Programming-Lab/Lab-01/Express-App/Chad.jpeg');
});

app.get('/gethtml',(req,res)=>{
    res.sendFile('E:/Software-Engineering-Study/5th-Semester/Lab/Server-Programming-Lab/Lab-01/Express-App/index.html');
});