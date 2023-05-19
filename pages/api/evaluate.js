import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export default async function handler(req, res) {
    const conversation = req.body.conversation
    const patient = req.body.patient
    console.log(conversation, patient)
    try {

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: Prompt(conversation, patient),
            temperature: 0.7,
            max_tokens: 300,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        // console.log(completion.data.choices[0].text)
        // res.status(200).json({ result: completion.data.choices[0].text });
        // res.status(200).json({ sender: "ai", text: "hello", status: 200 })

        res.status(200).json({ sender: "ai", text: completion.data.choices[0].text, status: 200 })

    } catch (error) {
        res.status(500).json({ sender: "ai", text: "Ooops! an error occured !", status: 500 })
    }
    // res.status(200).json({sender:"ai",text:"from api",status:200})

}


function Prompt(conversation, patient) {


    return `
    Bitte bewerte das folgende simulierte Gespräch zwischen Zahnmedizinstudent und Patient zu Trainingszwecken und fokussiere dich auf folgende Punkte:

    Gespräch:
    ${conversation.filter((message)=> message.sender != "error").map((message)=> `${message.sender === "user" ? "doctor":"patient"}: ${message.text} \n`)}

    1. Ist die Diagnose ${patient.diagnosis} richtig gestellt worden?
    2. Ist die richtige Therapie ${patient.therapy} vorgeschlagen worden?
    3. War die Kommunikation des Arztes einfühlsam und angemessen?
    
    Berücksichtigen Sie keine Konversation als Antwort !
    `

}


