const express = require('express');
const router = express.Router();
// नई Multer कॉन्फ़िगरेशन इम्पोर्ट करें
const upload = require('../middlewares/multer');

router.get('/', (req, res) => {
  res.status(200).json({
    greeting: 'Hello from airbnb-clone api',
  });
});

// डिवाइस से इमेज अपलोड करें
// यह रूट अब फाइलों को सर्वर पर सेव करेगा और उनका पाथ लौटाएगा
router.post('/upload', upload.array('photos', 100), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'कोई फ़ाइल अपलोड नहीं हुई।' });
    }

    // सभी अपलोड की गई फाइलों का पाथ इकट्ठा करें
    const filePaths = req.files.map(file => {
      return `/uploads/${file.filename}`;
    });

    res.status(200).json(filePaths);

  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({
      error,
      message: 'Internal server error',
    });
  }
});

// Cloudinary से जुड़ा रूट हटा दिया गया है

router.use('/user', require('./user'));
router.use('/places', require('./place'));
router.use('/bookings', require('./booking'));

module.exports = router;
