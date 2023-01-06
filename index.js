const express = require("express");
const fileUpload = require('express-fileupload');
const fs = require('fs');

const cors = require = require('cors');
const app = express();

// NOTE:: Cross Browsing Issue
app.use(cors());
app.use(fileUpload());

const port = ( port ) => {
   if(!port){
      return 4000
   }
   else{
      return port 
   }
}


app.get(``,(req,res) =>{{
   res.send("webcam rest api")
}}
)

app.get(`/webcam`,(req,res) =>{{


   res.send([{
      test:"1"
   }])

}
})

app.post(`/webcam`,(req,res) =>{{

   const { file } = req.files;

   const day = new Date().toLocaleString()
     
   const videoType = file.mimetype.replaceAll("video/",".")

   file.mv( `${__dirname}/video/webcam/${day}${videoType}`,
      
      (err) => {
       if (err) {
         return res.status(500).send(err);
       }

       else{
        
         fs.readFileSync(`${__dirname}/video/webcam/${day}${videoType}`)
        
            /* return res.status(200) */
       }

     }
      );
   
   
}}
)


app.get(`/display`,(req,res) =>{{
   res.send([{
      test:"1"
   }])
}})

app.post(`/display`,(req,res) =>{{

   const { file } = req.files;

   const day = new Date().toLocaleString()
     
   const videoType = file.mimetype.replaceAll("video/",".")

   file.mv( `${__dirname}/video/display/${day}${videoType}`,
      
      (err) => {
       if (err) {
         return res.status(500).send(err);
       }

       else{
        
         fs.readFileSync(`${__dirname}/video/display/${day}${videoType}`)
        
            /* return res.status(200) */
       }

     }
      );
   
   
}}
)


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