"use client"

import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { FiSend } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";


import { useState, useRef, useEffect } from 'react'

export default function Home() {
    const [Input, setInput] = useState("")
    const [Conversation, setConversation] = useState([])
    const [ClosePopup, setClosePopup] = useState(true)
    const [ActiveAi, setActiveAi] = useState(false)
    const [Evaluating, setEvaluating] = useState(false)
    const [StopConversation, setStopConversation] = useState(false)
    const [Patient, setPatient] = useState({})
    const [ImageUrl, setImageUrl] = useState("")
    const [NextPatient, setNextPatient] = useState(false)

    const [Evaluation, setEvaluation] = useState({})




    const messagesRef = useRef(null);

    // Run one time When Page Reload
    useEffect(() => {
        fetch("/api/patient").then(data => data.json()).then((patient) => {
            setPatient(patient)
        })
    }, [])




    // Stop Conversation And evaluate the Score
    function StopConversationHandler() {
        // setStopConversation(true)
        alert(StopConversation)
        if (StopConversation) {
            alert("hello")

            let options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ conversation: Conversation, patient: Patient })
            }

            fetch("/api/evaluate", options).then(data => data.json()).then((message) => {
                if (message.status === 200) {
                    let MessageObject = { sender: message.sender, text: message.text }
                    setConversation([...Conversation, MessageObject])
                } else if (message.status != 200) {
                    let MessageObject = { sender: message.sender, text: message.text }
                    setConversation([...Conversation, MessageObject])
                }
                setActiveAi(false)
            })
        }

    }
    // Bring Next Patient
    useEffect(() => {
        if (!NextPatient) return
        setConversation([])
        setStopConversation(false)
        setPatient({})
        setEvaluation({})
        fetch("/api/patient").then(data => data.json()).then((patient) => {
            setPatient(patient)
            setNextPatient(false)
        })

        // if (!messagesRef?.current?.scrollHeight) return
        // messagesRef.current.scrollTop = messagesRef.current.scrollHeight;

    }, [NextPatient]);
    // Pictures Handler
    function ClinicalPicturesHandler() {
        setImageUrl(Patient.clinicalPicture)
        setClosePopup(false)
    }

    function RadioGraphHandler() {
        setImageUrl(Patient.radiograph)
        setClosePopup(false)
    }

    // Send message when enter pressed
    function KeyPressHandler(e) {
        if (e.key === "Enter") {
            MessageHandler()
        }
    }

    // Scroll to the bottom whenever the messages change
    useEffect(() => {
        if (!messagesRef?.current?.scrollHeight) return
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;

    }, [Conversation]);


    // Handle User Message
    function MessageHandler() {
        if (Input == "") return
        let MessageObject = { sender: "user", text: Input }
        setConversation([...Conversation, MessageObject])
        setInput("")
        setActiveAi(true)
    }


    // Handle When The User Message
    useEffect(() => {
        if (ActiveAi) {

            let options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: Conversation[Conversation.length - 1], patient: Patient })
            }

            fetch("/api/question", options).then(data => data.json()).then((message) => {
                if (message.status === 200) {
                    let MessageObject = { sender: message.sender, text: message.text }
                    setConversation([...Conversation, MessageObject])
                } else if (message.status != 200) {
                    let MessageObject = { sender: message.sender, text: message.text }
                    setConversation([...Conversation, MessageObject])

                }
                setActiveAi(false)

            })


        }

    }, [ActiveAi]);


    // Stop Conversation And evaluate the Score
    useEffect(() => {
        if (StopConversation) {

            let options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ conversation: Conversation, patient: Patient })
            }

            fetch("/api/evaluate", options).then(data => data.json()).then((message) => {
                if (message.status === 200) {
                    let MessageObject = { sender: message.sender, text: message.text }
                    setEvaluation(MessageObject)
                } else if (message.status != 200) {
                    let MessageObject = { sender: message.sender, text: message.text }
                    setEvaluation(MessageObject)
                }
                setEvaluating(false)
            })
            if (!messagesRef?.current?.scrollHeight) return
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [StopConversation])




    return (
        <main className="">
            <Navbar />
            <div className={`imagePopup ${ClosePopup ? "d-none" : ""}`} >
                <button onClick={() => { setClosePopup(true) }}><AiOutlineClose /></button>
                <div className="img"><img src={ImageUrl} alt="Picture is not available !" /></div>
            </div>

            <section className='wrapper'>
                {Object.keys(Patient) == 0 &&
                    <div className='wait'><BsClockHistory /> <div className='ml-3'> Waiting for Patient...</div></div>
                }

                {Object.keys(Patient) != 0 &&
                    <>
                        <div className="chatWrapper">
                            <div ref={messagesRef} className="chat">

                                {Conversation.map((message, i) => {
                                    return (
                                        <div key={i} className={`messageWrapper ${message.sender}`}>
                                            <div className="message ">{message.text}</div>
                                        </div>
                                    )
                                })}
                                {Conversation.length == 0 &&
                                    <div className={`messageWrapper`}>
                                        <div className="message bg-green-800 text-white">
                                            Dental Assistant: Dr. your Patient is here ! <br />
                                            Ask a question and start the Conversation
                                        </div>
                                    </div>
                                }
                                {StopConversation &&
                                    <div className="message bg-green-800 text-gray-100">
                                        <b> Great Job ! </b> <br />
                                        Let´s see what kind of Feedback our AI Supervisor has for you:
                                    </div>
                                }
                                {Object.keys(Evaluation) != 0 &&
                                    <div className={`message ${Evaluation.sender} bg-green-800 text-gray-100 whitespace-pre-line`}>
                                        <b>Ai Supervisor</b>: {Evaluation.text}
                                    </div>
                                }

                                {ActiveAi || Evaluating ? (
                                    <div className={`messageWrapper ai`}>
                                        <div className="message"><b>....</b></div>
                                    </div>
                                ) : ""
                                }

                            </div>
                            {!StopConversation &&
                                <div className="chatActions">
                                    <input type="text" value={Input} className='textBox' onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => { KeyPressHandler(e) }} />
                                    <button onClick={() => MessageHandler()}><FiSend /></button>
                                </div>
                            }
                        </div>
                        <div className="sidebarActions">
                            {!StopConversation &&
                                <>
                                    <button onClick={() => ClinicalPicturesHandler()}>Clinical Pictures</button>
                                    <button onClick={() => RadioGraphHandler()}>Request RadioGraph</button>
                                    <button className='red' onClick={() => { 
                                        setStopConversation(true) 
                                        setEvaluating(true)
                                        }}>Stop and Evaluate</button>
                                </>
                            }

                            {StopConversation &&
                                <button className='green' onClick={() => { setNextPatient(true) }}>Bring Next Patient</button>
                            }
                        </div>
                    </>
                }

            </section>

            {/* <section className='wrapper'>
                <div className="chatWrapper">
                    <div ref={messagesRef} className="chat">
                        <div className={`messageWrapper`}>
                            <div className="message bg-amber-100">
                                <b> Great Job ! </b> <br />
                                Let´s see what kind of Feedback our AI Supervisor has for you:
                            </div>
                        </div>
                    </div>

                </div>
                <div className="sidebarActions">
                </div>

            </section> */}


            <Footer />

        </main>
    )
}
