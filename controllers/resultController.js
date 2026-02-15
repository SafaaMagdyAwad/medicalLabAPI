import dotenv from 'dotenv';
dotenv.config();
export const AddResult = async (req, res) => {
    try {
        const { id } = req.params;
        validateId(res, id);
        const results = req.body.results;

        const doctorId = req.user.id;
        const booking = await Booking.findByIdAndUpdate(id, { results, doctorId }, { new: true });
        const patientId=booking.patientId;
        console.log(patientId, "patientId");

        if (!booking) return res.status(404).json({ message: "Booking not found" });
        //send sms to the patient number
        const patient = await User.findById(patientId);
        // const patientmobile=patient.mobile;
        console.log(patient, "patient");
        sendSMS(patient.mobile,`your result is ready now form   ${process.env.BACK_END_URL}/api/bookings/code/${booking.code}`)
        res.status(200).json({ message: "Booking updated successfully", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};