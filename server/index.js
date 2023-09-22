const express= require('express');
const mongoose=require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());
const Iet = require('./models/Ietdetails');
const mongoconnect = require("./config");
const nodemailer = require('nodemailer');
app.use(express.json())
const { generateVerificationToken } = require('./utils');

mongoose.connect(mongoconnect.mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on("error", (error) => console.error("MongoDB connection error:", error));
  db.once("open", () => console.log("Connected to MongoDB successfully"));


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'chaithanya@designesthetics.com',
      pass: 'pzjg ivjg roxq fguy' 
    }
  });

  const sendEmail = (email, token) => {
    const mailOptions = {
      from: 'chaithanya@designesthetics.com',
      to: 'chaithanya@designesthetics.com',
      subject: 'Email verification',
      html: `
        <p>Please click on the following link to verify your email address:</p>
        <a href="http://localhost:3001/verify/${token}">http://localhost:3001/verify/${token}</a>
      `,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error in sending email: ' + error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };

  app.post('/iet', async (req, res) => {
    try {
      const { Name, PhoneNumber, Email } = req.body;
  
      // Generate a verification token
      const verificationToken = generateVerificationToken();
  
      // Create a new IET instance with IsEmailVerified set to false
      const newIet = new Iet({
        Name,
        PhoneNumber,
        Email,
        VerificationToken: verificationToken,
        IsEmailVerified: false
      });
  
      const savedIet = await newIet.save();
  
      // Send verification email
      sendEmail(Email, verificationToken);
  
      return res.status(201).json(savedIet);
    } catch (error) {
      console.error('Error saving Iet details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get('/verify/:token', async (req, res) => {
    const { token } = req.params;
  
    try {
      const user = await Iet.findOne({ VerificationToken: token });
  
      if (!user) {
        return res.status(404).send('Invalid token');
      }
  
      // Mark the email as verified
      user.IsEmailVerified = true;
      user.VerificationToken = null; // Clear the token
      await user.save();
  
      return res.redirect(`http://localhost:3001/verified?status=verified&name=${user.Name}&phoneNumber=${user.PhoneNumber}&email=${user.Email}`);
    } catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

app.listen(3003, () =>{
console.log('Server running on port 3003...')
})