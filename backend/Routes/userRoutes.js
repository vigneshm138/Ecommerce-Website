import express from 'express';
import { userRegistration, verifyOTP } from '../Controler/userController.js';

const router = express.Router();

// router.get('/get', (req, res) => {
//     res.send("user")
// })
router.post('/userRegistration', userRegistration)
router.post('/userRegistrationVerify', verifyOTP)

export default router;





