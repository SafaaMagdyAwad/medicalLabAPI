/**
 * Send SMS using Twilio
 * @param {string} to - Recipient phone number with country code
 * @param {string} message - Message text
 * @returns {Promise<object>} - Twilio message object
 */
export const sendSMS = async (to, message) => {
  try {
    const sms = await client.messages.create({
      body: message,
      from: twilioNumber,
      to: to,
    });

    return { success: true, sid: sms.sid };
  } catch (err) {
    console.error('Failed to send SMS:', err.message);
    throw new Error('Failed to send SMS'); // throw to handle in route
  }
};