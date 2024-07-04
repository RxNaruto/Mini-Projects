"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
function processSubmission(submission) {
    return __awaiter(this, void 0, void 0, function* () {
        const { problemId, code, language } = JSON.parse(submission);
        console.log(`Processing of Problem id ${problemId}`);
        console.log(`code ${code}`);
        console.log(`Language ${language}`);
        yield new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Finished Processing submission for ${problemId}`);
    });
}
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Redis is connected");
            try {
                const submission = yield client.brPop("problem", 0);
                if (submission) {
                    processSubmission(submission.element);
                }
            }
            catch (error) {
                console.error("Error processing submission:", error);
            }
        }
        catch (error) {
            console.error("Failed to connect to Redis", error);
        }
    });
}
startWorker();