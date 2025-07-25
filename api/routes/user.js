const express = require('express');
const router = express.Router();
// पुरानी multer डेफ़िनिशन की जगह नई कॉन्फ़िगरेशन इम्पोर्ट करें
const upload = require('../middlewares/multer');

const {
  register,
  login,
  logout,
  googleLogin,
  uploadPicture,
  updateUserDetails,
} = require('../controllers/userController');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/google/login').post(googleLogin);

// यूजर की प्रोफाइल पिक्चर अपलोड करने के लिए भी नई कॉन्फ़िगरेशन का उपयोग करें
// ध्यान दें: आपको अपने userController में 'uploadPicture' फंक्शन को अपडेट करना होगा
// ताकि वह Cloudinary URL की जगह लोकल फाइल पाथ ('/uploads/filename.jpg') को सेव करे।
router.route('/upload-picture').post(upload.single('picture'), uploadPicture);

router.route('/update-user').put(updateUserDetails);
router.route('/logout').get(logout);

module.exports = router;
