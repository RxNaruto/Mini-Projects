import { createClient } from "redis";
const client = createClient();

async function processSubmission(submission:any){
    const {name,atsScore} = JSON.parse(submission);
    console.log(`Name: ${name}`);
}

async function startWorker(){
   try {
     await client.connect();
     console.log("Worker connected to redis");

     while(true){
        try {
            const submission = await client.brPop("jobListing",0);
            if(submission){
            await processSubmission(submission.element);
            }
            await new Promise(resolve=>setTimeout(resolve,3000));
        } catch (error) {
            console.log("Error processing submission" ,error);
            
        }

     }
   } catch (error) {
    console.log(error);
    console.log("Error connecting to redis");
    
   }

}
startWorker();