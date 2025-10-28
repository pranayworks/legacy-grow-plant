import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import XLSX from 'xlsx';

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
  try {
    const doc = await Login.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/signup', async (req, res) => {
  try {
    const doc = await Signup.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
app.get('/export-contacts', async (_req, res) => {
  try {
    const rows = await Contact.find().lean();
    sendAsExcel(res, rows, 'contacts.xlsx');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', async (_req, res) => {
  try {
    const rows = await Volunteer.find().lean();
    sendAsExcel(res, rows, 'volunteers.xlsx');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/export-csrs', async (_req, res) => {
  try {
    const rows = await CSR.find().lean();
    sendAsExcel(res, rows, 'csrs.xlsx');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/export-logins', async (_req, res) => {
  try {
    const rows = await Login.find().lean();
    sendAsExcel(res, rows, 'logins.xlsx');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/export-signups', async (_req, res) => {
  try {
    const rows = await Signup.find().lean();
    sendAsExcel(res, rows, 'signups.xlsx');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/export-donations', async (_req, res) => {
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
