import Patient from "@/db/models/patient"

export default async function handler(req, res) {
    const patient = await Patient.aggregate([{ $sample: { size: 1 } }])
    res.status(200).json(...patient)
}