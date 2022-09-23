const express = require("express");
const _ = require('lodash');

const app = express();

const port = ( port ) => {
   if(!port){
      return 4000
   }
   else{
      return port 
   }
}

_.map()

app.get(`/`,(req,res) =>{{
   res.send("hellow world")
}}
)

app.get(``,(req,res) =>{{
   res.send("hellow world")
}}
)


app.listen(port(),()=>{
   console.log(`this port is ${port()}`)
})