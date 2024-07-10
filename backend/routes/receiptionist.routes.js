import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyReceptionist } from "../middlewares/receiptionist.middleware.js";
import {
    addAppointment, addPaymentDetails, addMedicine,
    addReport, addNewPatientDetails, updateExistingPatientDetails,
    deleteLastMonthsAppointments,
    deletePatient,
    deleteLastWeeeksAppointments,
    deleteSingleAppointment
} from "../controllers/receptionist.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();


router.route("/addAppointment").post(verifyJWT, verifyReceptionist, addAppointment)
router.route("/addPaymentDetails").post(verifyJWT, verifyReceptionist, addPaymentDetails)
router.route("/addMedicine").post(verifyJWT, verifyReceptionist, addMedicine)
router.route("/addReport").post(verifyJWT, verifyReceptionist, upload.single("reportFile"), addReport)
router.route("/addPatientDetails").post(verifyJWT, verifyReceptionist, addNewPatientDetails)
router.route("/updatePatientDetails").post(verifyJWT, verifyReceptionist, updateExistingPatientDetails)
router.route("/deleteLastMonthAppointments").delete(verifyJWT, verifyReceptionist, deleteLastMonthsAppointments);
router.route("/deleteLastWeekAppointments").delete(verifyJWT, verifyReceptionist, deleteLastWeeeksAppointments);
router.route("/deletePatient/:patientId").delete(verifyJWT, verifyReceptionist, deletePatient);
router.route("/deleteAppointment/:id").delete(verifyJWT, verifyReceptionist, deleteSingleAppointment);

export default router;