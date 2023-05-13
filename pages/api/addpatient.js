import Patient from "@/db/models/patient"

export default async function handler(req, res) {

    if (req.method !== "POST") return res.status(400).json({ success: false, text: "Bad Request" })

    const { UserName, Password } = req.body.patient
    if (UserName !== process.env.USERNAME && Password !== process.env.PASSWORD) return res.status(401).json({ success: false, text: "Invalid UserName or Passowrd !" })

    try {
        let { patientNumber, patientName, patientInfo, reasonForComing,
            symptoms, clinicalPicture, radiograph, clinicalTests, diagnosis, therapy } = req.body.patient
        // converting to array
        symptoms = symptoms.split(",")
        clinicalTests = clinicalTests.split(",")
        therapy = therapy.split(",")

        let patient = new Patient({
            patientNumber,
            patientName,
            patientInfo,
            reasonForComing,
            symptoms,
            clinicalPicture,
            radiograph,
            clinicalTests,
            diagnosis,
            therapy
        })

        await patient.save()
        res.status(200).json({ success: true, text: "Patient saved successfully!" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, text: error })

    }


}