const express = require("express");
const { CONFING } = require("./api");

const app = express();

// NOTE:: Cross Browsing Issue
const cors = require = require('cors');
app.use(cors());

const port = ( port ) => {
   if(!port){
      return 4000
   }
   else{
      return port 
   }
}

/* NOTE :: use는 get post 가능  */
app.use(`/`,(req,res) =>{{
   res.send("hellow world")
}}
)

console.log(process.env.user);


/* NOTE :: issue log */
app.use((req, res, next) => {
   res.status(404).send('page not find');   
});

app.use((err, req, res, next) => {
   console.log(err.stack);
   res.status(500).send('server error');
})


app.listen(port(),()=>{
   console.log(`this port is ${port()}`)
})