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

        // const completion = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: Prompt(question, patient),
        //     temperature: 0.7,
        //     max_tokens: 250,
        //     top_p: 1,
        //     frequency_penalty: 0,
        //     presence_penalty: 0,
        // });

        const completion = await openai.createChatCompletion({
            model : "gpt-3.5-turbo-0301",
            messages : [{ "role": "system", "content": `
            You are pretending as patient. 
            Your name is ${patient.patientName}.
            you are ${patient.patientInfo}, 
            reason for coming to dentist: ${patient.reasonForComing}, 
            your symptoms are : ${patient.symptoms.map((symtom) => symtom + ",")},
            your clinical tests are : ${patient.clinicalTests.map((test) => test + ",")}
            `},
            
            { "role": "user", "content": "Hello, It is so nice to meet you! I will definitely take a look at it" },
            { "role": "assistant", "content": `Hi, nice to meet you too!, yes please its very painful` },
            { "role": "user", "content": "what is your name ?" },
            { "role": "assistant", "content": `My name is ${patient.patientName}`},
            { "role": "user", "content": "how are you feeling today ? don't say `as a language model` !" },
            { "role": "assistant", "content": `I'm feeling bad due to my ${patient.reasonForComing}` },


            // { "role": "assistant", "content": `sure ! my name is ${patient.patientName}`},

            { "role": "user", "content": question.text },




        ]
    })
        console.log(completion.data.choices[0].message.content)
        // res.status(200).json({ result: completion.data.choices[0].text });

        res.status(200).json({ sender: "ai", text: completion.data.choices[0].message.content, status: 200 })
        // res.status(200).json({ sender: "ai", text: "hello", status: 200 })

    } catch (error) {
        console.log(error)
        res.status(500).json({ sender: "error", text: "Ooops! an error occured. please message again !", status: 500 })
    }
    // res.status(200).json({sender:"ai",text:"from api",status:200})

}


function Prompt(question, patient) {


    return `
    you have to pretend like patient !
    Dein Name ist  ${patient.patientName} 
    Du bist ein/e ${patient.patientInfo} !

    Du bist der Patient und du bist zu mir gekommen, weil ${patient.reasonForComing} 
    Deshalb bitten Sie mich um Hilfe!

    ${patient.symptoms.map((symtom) => symtom + ",")}
    
    Versuchen Sie beim Zahnarzt herauszufinden, woran Sie leiden und wie er Ihnen helfen kann

    Wenn der Zahnarzt klinische Tests durchführt, reagieren Sie folgendermaßen:
    ${patient.clinicalTests.map((test) => test + ",")}

    ${question.text} 
    Gib mir eine schnelle Antwort!
    `

}

