import { Doctor, Patient } from "../moules/Users.js";


export const getMyProfile = async (req, res) => {
  try {
    const user =req.user;
    if(!user){
      res.status(303).json({message:"user Not Found"})
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const createPatient = async (req, res) => {
  try {
    // added by   assistant or doctor
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};


export const getPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};
