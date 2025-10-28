import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import XLSX from 'xlsx';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI is not set in .env');
}

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// Schemas & Models
const options = { timestamps: { createdAt: 'date', updatedAt: false } };

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  options
);
const Contact = mongoose.model('Contact', ContactSchema);

const VolunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    interest: { type: String, required: false },
  },
  options
);
const Volunteer = mongoose.model('Volunteer', VolunteerSchema);

const CSRSpecSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    proposal: { type: String, required: false },
  },
  options
);
const CSR = mongoose.model('CSR', CSRSpecSchema);

const LoginSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  options
);
const Login = mongoose.model('Login', LoginSchema);

const SignupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  options
);
const Signup = mongoose.model('Signup', SignupSchema);

const DonationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentId: { type: String, required: true },
  },
  options
);
const Donation = mongoose.model('Donation', DonationSchema);

// Helpers
function sendAsExcel(res, data, filename) {
  const wb = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, sheet, 'Sheet1');
  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  return res.send(buffer);
}

// Middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Routes - POST
app.post('/contact', async (req, res) => {
  try {
    const doc = await Contact.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/volunteer', async (req, res) => {
  try {
    const doc = await Volunteer.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/csr', async (req, res) => {
  try {
    const doc = await CSR.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await Signup.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new Signup({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/donation', async (req, res) => {
  try {
    const doc = await Donation.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Routes - GET export
app.get('/export-contacts', auth, async (_req, res) => {
  try {
    const rows = await Contact.find().lean();
    sendAsExcel(res, rows, 'contacts.xlsx');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', auth, async (_req, res) => {
  try {
    const rows = await Volunteer.find().lean();
    sendAsExcel(res, rows, 'volunteers.xlsx');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/export-csrs', auth, async (_req, res) => {
  try {
    const rows = await CSR.find().lean();
    sendAsExcel(res, rows, 'csrs.xlsx');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/export-logins', auth, async (_req, res) => {
  try {
    const rows = await Login.find().lean();
    sendAsExcel(res, rows, 'logins.xlsx');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/export-signups', auth, async (_req, res) => {
  try {
    const rows = await Signup.find().lean();
    sendAsExcel(res, rows, 'signups.xlsx');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/export-donations', auth, async (_req, res) => {
  try {
    const rows = await Donation.find().lean();
    sendAsExcel(res, rows, 'donations.xlsx');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (_req, res) => {
  res.send({ status: 'OK', service: 'Green Legacy Backend', time: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
