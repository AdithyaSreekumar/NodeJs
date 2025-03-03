const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('Hello Express!'); 
});

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});