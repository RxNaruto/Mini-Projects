import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

const client = createClient();
client.on('error',(err)=>{
    console.log(err)
})

app.post("/post",async(req,res)=>{
    const problemId = req.body.problemId;
    const code = req.body.code;
    const language = req.body.language;

    try{
        await client.lPush("problem",JSON.stringify({problemId,code,language}));
        res.status(200).json({
            message: "Problem submission Success"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        })
    }

})

async function startServer(){
    try{
        await client.connect();
        console.log("redis connected");

        app.listen(3000);
        console.log("Server is running on port 3000");
    }catch(err){
        console.log("failed to connect to redis", err);
    }
    
}
startServer();