export const generateBookingCode = () => {
  const random = Math.floor(1000 + Math.random() * 9000); // 4 أرقام عشوائية
  const timestamp = Date.now().toString().slice(-6);       // آخر 6 أرقام من الوقت الحالي
  return `BKG-${timestamp}${random}`;                      // مثال: "BKG-5678901234"
};
