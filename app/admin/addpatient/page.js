"use client"

import { useState} from "react"

export default function Home() {
    const [Patient, setPatient] = useState({})
    const [Message, setMessage] = useState({bool:false,text:"",success:false})
  
    function SubmitHandler(){
        if(Object.keys(Patient).length != 12) return setMessage({bool:true,text:"Fields Should not be Blank !",success:false})
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({patient: Patient })
        }

        fetch("/api/addpatient", options).then(data => data.json()).then((message) => {
            setMessage({bool:true,text:message.text,success:message.success})
        })
    }


    

    return (
    <main className="patientformWrapper">
     <div className="form">
        <h2>Add Patient</h2>
        
        <span>Patient Number</span>
        <input type="number" className='input'  onChange={(e)=>setPatient({...Patient,patientNumber:e.target.value})}/>
        
        <span>Patient Name</span>
        <input type="text" className='input'  onChange={(e)=>setPatient({...Patient,patientName:e.target.value})}/>
        
        <span>Patient Info</span>
        <input type="text" className='input'  onChange={(e)=>setPatient({...Patient,patientInfo:e.target.value})}/>
        
        <span>Reason for Coming</span>
        <input type="text" className='input'  onChange={(e)=>setPatient({...Patient,reasonForComing:e.target.value})}/>
        
        <span>Diagnosis</span>
        <input type="text" className='input'  onChange={(e)=>setPatient({...Patient,diagnosis:e.target.value})}/>
        
        <span>Clinical Picture Url</span>
        <input type="text" className='input'  onChange={(e)=>setPatient({...Patient,clinicalPicture:e.target.value})}/>
        
        <span>RadioGraph Url</span>
        <input type="text" className='input'  onChange={(e)=>setPatient({...Patient,radiograph:e.target.value})}/>
        
        <span>Symptoms</span>
        <input type="text" className='input' placeholder='seperate by comma ","' onChange={(e)=>setPatient({...Patient,symptoms:e.target.value})}/>

        <span>Clinical Tests</span>
        <input type="text" className='input' placeholder='seperate by comma ","' onChange={(e)=>setPatient({...Patient,clinicalTests:e.target.value})}/>

        <span>Therpy</span>
        <input type="text" className='input' placeholder='seperate by comma ","' onChange={(e)=>setPatient({...Patient,therapy:e.target.value})}/>

        <span>Username</span>
        <input type="text" className='input' placeholder='' onChange={(e)=>setPatient({...Patient,UserName:e.target.value})}/>

        <span>Password</span>
        <input type="password" className='input' placeholder='' onChange={(e)=>setPatient({...Patient,Password:e.target.value})}/>
        
        {Message.bool && 
        <span className={`${Message.success ? "text-green-600":"text-red-600"}`}>{Message.text}</span>
        }

        <button className='input mt-5' onClick={(e)=>{SubmitHandler()}}>Submit Patient</button>
      

     </div>

    </main>
  )
}
