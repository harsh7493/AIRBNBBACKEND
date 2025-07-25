const multer = require('multer');
const path = require('path');

// Multer के लिए स्टोरेज इंजन कॉन्फ़िगर करें
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // सभी अपलोड की गई फाइलें 'uploads/' फ़ोल्डर में जाएंगी
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // फ़ाइल के नाम को यूनिक बनाने के लिए, ताकि कोई फ़ाइल ओवरराइट न हो
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// सिर्फ़ इमेज फ़ाइलों को स्वीकार करने के लिए फ़िल्टर
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('यह एक इमेज नहीं है! कृपया सिर्फ़ इमेज अपलोड करें।'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB फ़ाइल साइज़ लिमिट
});

module.exports = upload;
