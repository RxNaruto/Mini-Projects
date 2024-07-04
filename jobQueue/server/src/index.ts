import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

const client = createClient();
client.on('error',(err)=>{
    console.log(err);
})

app.post("/",async(req,res)=>{
    const name:string = req.body.name;
    const atsScore: string = req.body.atsScore;
    
   try {
     await client.lPush("jobListing",JSON.stringify({name,atsScore}));
     res.status(200).json({
         message: "Job added"
     })
     await new Promise(resolve=>setTimeout(resolve,3000));
   } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server error");
    
   }
})

async function startServer(){
    try{
        await client.connect();
        console.log("connected to redis");

        app.listen(3000);
    }catch(err){
        console.log(err);
        console.log("Error starting server");
    }
}

startServer();