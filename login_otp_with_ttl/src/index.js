import Redis from "ioredis";
import express from "express";

const app = express();

app.use(express.json());
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

function otpKey(phone) {
  return `otp:${phone}`;
}

app.post("/otp", async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redis.set(otpKey(phone), otp, "EX", 30);
  res.json({
    message: `OTP for ${phone} is ${otp}. It will expire in 30 seconds.`,
  });
});

app.post("/otp/verify", async (req, res) => {
  const { phone, otp } = req.body;
  const savedOtp = await redis.get(otpKey(phone));
  if(!savedOtp) {
    return res.status(400).json({ success: false, message: "OTP expired or not found." });
  }
  if(savedOtp === otp) {
    await redis.del(otpKey(phone));
    return res.json({ success: true, message: "OTP verified successfully." });
  }
  return res.status(400).json({ success: false, message: "Invalid OTP." });
});

app.get("/otp/:phone/ttl", async (req, res) => {
    const ttl = await redis.ttl(otpKey(req.params.phone));
    res.json({ttl});
});

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})