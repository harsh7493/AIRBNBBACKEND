require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000' // अपने फ्रंटएंड का URL यहाँ डालें
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 'uploads' फ़ोल्डर को स्टैटिक फ़ोल्डर के रूप में सर्व करें
// यह लाइन बहुत ज़रूरी है
app.use('/uploads', express.static(__dirname + '/uploads'));

// Routes
app.use('/', require('./routes')); // आपकी मुख्य राउटर फ़ाइल

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
