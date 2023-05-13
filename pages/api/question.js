import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export default async function handler(req, res) {
    const question = req.body.question
    const patient = req.body.patient
    console.log(question, patient)
    try {

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: GetAnswer(question, patient),
            temperature: 0.7,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        console.log(completion.data.choices[0].text)
        // res.status(200).json({ result: completion.data.choices[0].text });

        res.status(200).json({ sender: "ai", text: completion.data.choices[0].text, status: 200 })
        // res.status(200).json({ sender: "ai", text: "hello", status: 200 })

    } catch (error) {
        res.status(500).json({ sender: "ai", text: "Ooops! an error occured. please message again !", status: 500 })
    }
    // res.status(200).json({sender:"ai",text:"from api",status:200})

}


function GetAnswer(question, patient) {


    return `
    Du bist ein/e ${patient.patientInfo}. Dein Name ist  ${patient.patientName}.

    Ich bin der Zahnarzt und du bist zu mir gekommen, weil ${patient.reasonForComing}
    Deshalb bittest du um meine Hilfe.

    ${patient.symptoms.map((symtom)=> symtom + ",")}

    Ich versuche herauszufinden, woran du leidest und und wie ich dir helfen kann.

    Falls ich klinische Tests durchführe, reagierst du so darauf:
    ${patient.clinicalTests.map((test)=> test + ",")}


    Antworte mir in nur einem Satz!
    ----------------
    ${question.text}
    `

}