import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const port = 5050;

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send({
        message: "hi, this is custom api from https://openai.com/ ",
    });
});

app.post("/", async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 1,
            max_tokens: 600,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        // await PromiseTimeout(30000);
        res.status(200).send({
            bot: response.data.choices[0].text,
        });
    } catch (error) {
        res.status(500).send({ error });
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
});

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });

var server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
server.setTimeout(30000);
