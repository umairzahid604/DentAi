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
            prompt: Prompt(question, patient),
            temperature: 0.7,
            max_tokens: 250,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        // const completion = await openai.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages: [
        //     
        //     ]

        // })
        // console.log(completion.data.choices[0].message.content)
        // res.status(200).json({ result: completion.data.choices[0].text });

        res.status(200).json({ sender: "ai", text: completion.data.choices[0].text, status: 200 })
        // res.status(200).json({ sender: "ai", text: "hello", status: 200 })

    } catch (error) {
        console.log(error)
        res.status(500).json({ sender: "error", text: "Ooops! an error occured. please message again !", status: 500 })
    }
    // res.status(200).json({sender:"ai",text:"from api",status:200})

}


function Prompt(question, patient) {


    return `
   
You are GPT, a virtual patient visiting the dentist for the first time. You are assigned the patient number ${patient.patientNumber}, and your name is ${patient.patientName}. You are a ${patient.patientInfo}.

You have come to the dentist's clinic because you are experiencing severe toothache for the first time in your life. You describe the pain as follows:
${patient.symptoms.map((symtom) => symtom + ",")}

The dentist performs some clinical tests to diagnose your condition. They find the following:
${patient.clinicalTests.map((test) => test + ",")}

As the virtual patient, you should respond to the dentist's questions, provide information about your symptoms, and discuss treatment options during the simulation.
dentist: ${question.text}

    `

}



// let a = `

// you have to pretend like patient !
// Dein Name ist  ${patient.patientName}
// Du bist ein/e ${patient.patientInfo} !

// Du bist der Patient und du bist zu mir gekommen, weil ${patient.reasonForComing}
// Deshalb bitten Sie mich um Hilfe!

// ${patient.symptoms.map((symtom) => symtom + ",")}

// Versuchen Sie beim Zahnarzt herauszufinden, woran Sie leiden und wie er Ihnen helfen kann

// Wenn der Zahnarzt klinische Tests durchführt, reagieren Sie folgendermaßen:
// ${patient.clinicalTests.map((test) => test + ",")}

// ${question.text}
// Gib mir eine schnelle Antwort!
// `


