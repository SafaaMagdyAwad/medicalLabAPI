import { MedicalTests } from "../moules/MeidcalTests.js";
import { validateId } from "../utils/validateId.js";

export const createOne = async (req, res) => {
    try {

        const { title, price } = req.body;
        if (!title || !price) {
            res.status(300).json({ message: "title and pricen feilds are required" });
        }
        const existingMedicalTest = await MedicalTests.find({ title });
        if (existingMedicalTest) {
            res.status(303).json({ message: "already exists" });
        }
        const medicalTest = await MedicalTests.create(req.body);
        res.status(201).json({ message: "created success", medicalTest });
    } catch (e) {
        throw e;
    }

}
//get All
//by all
export const getAll = async (req, res) => {
    try {
        const medicalTests = await MedicalTests.find();
        res.status(201).json({ message: " success", medicalTests });
    } catch (e) {
        throw e;
    }
}
//get by id
//by all
export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        validateId(res ,id);
        const medicalTest = await MedicalTests.findById(id);
        res.status(201).json({ message: " success", medicalTest });
    } catch (e) {
        throw e;
    }
}
//update
//doctor
export const updateOne = async (req, res) => {
    try {
        const id = req.params.id;
        validateId(res ,id);

        const updateData = req.body;
        const medicalTest = await MedicalTests.findByIdAndUpdate(id, updateData);
        res.status(201).json({ message: " success", medicalTest });
    } catch (e) {
        throw e;
    }
}
//delete
//doctor
export const deleteOne = async (req, res) => {
    try {
        const id = req.params.id;
        validateId(res ,id);

        const medicalTest = await MedicalTests.findByIdAndDelete(id);
        res.status(201).json({ message: " success", medicalTest });
    } catch (e) {
        throw e;
    }
}