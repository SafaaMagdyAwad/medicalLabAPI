import express from 'express'
const notificationRouter = express.Router();

notificationRouter.post('/send-sms', SendSMS);

export default notificationRouter