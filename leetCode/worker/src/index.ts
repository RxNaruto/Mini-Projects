import { resolve } from "path";
import { createClient } from "redis";
const client = createClient();


async function processSubmission(submission: string) {
    const { problemId, code, language } = JSON.parse(submission);

    console.log(`Processing of Problem id ${problemId}`);
    console.log(`code ${code}`);
    console.log(`Language ${language}`);

    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Finished Processing submission for ${problemId}`);


}

async function startWorker() {

    try {
        await client.connect();
        console.log("Redis is connected");
        try {
            const submission = await client.brPop("problem", 0);
            if (submission) {
                processSubmission(submission.element);
            }
        } catch (error) {
            console.error("Error processing submission:", error);

        }
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }

}

startWorker();


