import mongoose from 'mongoose'
import connectToDatabase from "../conn";

const patientSchema = new mongoose.Schema({
  patientNumber: {
    type: Number,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  patientInfo: {
    type: String,
    required: true
  },
  reasonForComing: {
    type: String,
    required: true
  },
  symptoms: {
    type: [String],
    required: true
  },
  clinicalPicture: {
    type: String,
    required: true
  },
  radiograph: {
    type: String,
    required: true
  },
  clinicalTests: {
    type: [String],
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  therapy: {
    type: [String],
    required: true
  }
},{ timestamps: true })

const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema)

export default Patient
