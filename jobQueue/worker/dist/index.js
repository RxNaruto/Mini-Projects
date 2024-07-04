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
        const { name, atsScore } = JSON.parse(submission);
        console.log(`Name: ${name}`);
    });
}
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Worker connected to redis");
            while (true) {
                try {
                    const submission = yield client.brPop("jobListing", 0);
                    if (submission) {
                        yield processSubmission(submission.element);
                    }
                    yield new Promise(resolve => setTimeout(resolve, 3000));
                }
                catch (error) {
                    console.log("Error processing submission", error);
                }
            }
        }
        catch (error) {
            console.log(error);
            console.log("Error connecting to redis");
        }
    });
}
startWorker();
