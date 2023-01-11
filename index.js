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

    const dir = fs.readdirSync(`${__dirname}/video/webcam` )
    
    const filePath = `${__dirname}/video/webcam/${dir[1]}`;

     const videoSize = fs.statSync(filePath).size;

     const CHUNK_SIZE = 10 ** 6; // 1MB
     const start = 0

     const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
      console.log(start, end);
     // Create headers
     const contentLength = end - start + 1;
     
     const headers = {
       "Content-Range": `bytes ${start}-${end}/${videoSize}`,
       "Accept-Ranges": "bytes",
       "Content-Length": contentLength,
       "Content-Type": "video/mp4",
     };
   
     // HTTP Status 206 for Partial Content
     res.writeHead(206, headers);
   
     // create video read stream for this particular chunk
     const videoStream = fs.createReadStream(filePath, { start, end });
   
     // Stream the video chunk to the client
     videoStream.pipe(res);
    
}
})

app.post(`/webcam`,(req,res) =>{{

   const { file } = req.files;
   
   const { end } = JSON.parse(req.body.obj).date;
  
   const videoType = file.mimetype.replaceAll("video/",".")

   const filefetch = `${__dirname}/video/webcam/db.json`;

   const readFileFor = () => {
      
      fs.readFile( filefetch , "utf-8" , (err,data) =>{

         if(err){
            console.log(err)
         }
   
         else{
            writeDataFor(data)
         }
   
      });

   }

   const writeDataFor = ( data ) => {

      let result = !data ? [] :  JSON.parse(data)

      result.push( JSON.parse(req.body.obj) )

      fs.writeFile(filefetch , "" , "utf-8" ,(err) =>{

         if(err){
   
            console.log(err)
   
         }
         else{
   
            fs.appendFileSync(filefetch , JSON.stringify(result) , "utf-8" )
   
         }
   
      })

   }

   file.mv( `${__dirname}/video/webcam/${end}${videoType}`,
      
      (err) => {
       if (err) {
         return res.status(500).send(err);
       }

       else{
        
         fs.readFileSync(`${__dirname}/video/webcam/${end}${videoType}`)
            
         readFileFor()

         return res.status(200)

       }

     }
   );
   
   
}}
)

app.get("/webcam_list" , (req,res) => {

   const filefetch = `${__dirname}/video/webcam/db.json`;
      
      fs.readFile( filefetch , "utf-8" , (err,data) =>{

         if(err){
            res.send(err)
            res.status(500)
         }
   
         else{
            res.send(!data ? [] : data )
            res.status(200)
         }
   
      });

   
})


app.get(`/display`,(req,res) =>{{
   
   const dir = fs.readdirSync(`${__dirname}/video/display` )
    
   const filePath = `${__dirname}/video/display/${dir[1]}`;

    const videoSize = fs.statSync(filePath).size;

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = 0

    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    // Create headers
    const contentLength = end - start + 1;
    
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
  
    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
  
    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(filePath, { start, end });
  
    // Stream the video chunk to the client
    videoStream.pipe(res);

}})

app.post(`/display`,(req,res) =>{{

   const { file } = req.files;

   const { end } = JSON.parse(req.body.obj).date;
     
   const videoType = file.mimetype.replaceAll("video/",".")

   const filefetch = `${__dirname}/video/display/db.json`;

   const readFileFor = () => {
      
      fs.readFile( filefetch , "utf-8" , (err,data) =>{

         if(err){
            console.log(err)
         }
   
         else{
            writeDataFor(data)
         }
   
      });

   }

   const writeDataFor = ( data ) => {

      let result = !data ? [] :  JSON.parse(data)

      result.push( JSON.parse(req.body.obj) )

      fs.writeFile(filefetch , "" , "utf-8" ,(err) =>{

         if(err){
   
            console.log(err)
   
         }
         else{
   
            fs.appendFileSync(filefetch , JSON.stringify(result) , "utf-8" )
            
         }
   
      })

   }



   file.mv( `${__dirname}/video/display/${end}${videoType}`,
      
      (err) => {
       if (err) {
         return res.status(500).send(err);
       }

       else{
        
         fs.readFileSync(`${__dirname}/video/display/${end}${videoType}`)
         
         readFileFor()
         
         return res.status(200)
       }

     }
      );
   
   
}}
)


app.get("/display_list" , (req,res) => {

   fs.readFileSync(`${__dirname}/video/display/db.json`)


})


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