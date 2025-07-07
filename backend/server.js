const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const dotenv = require('dotenv');
const app = express();
const PORT = 5000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const readData = (file) => JSON.parse(fs.readFileSync(`./data/${file}.json`, 'utf-8'));

app.get('/api/hospitals', (req, res) => {
  const hospitals = readData('hospitals');
  const search = req.query.search?.toLowerCase();
  const filtered = search ? hospitals.filter(h => h.name.toLowerCase().includes(search)) : hospitals;
  res.json(filtered);
});

app.get('/api/volunteers', (req, res) => {
  const volunteers = readData('volunteers');
  const search = req.query.search?.toLowerCase();
  const filtered = search ? volunteers.filter(v => v.name.toLowerCase().includes(search)) : volunteers;
  res.json(filtered);
});

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const fromPhone = process.env.TWILIO_PHONE;
const client = twilio(accountSid, authToken);

app.post('/api/sos', (req, res) => {
  const { to, message } = req.body;
  client.messages
    .create({ body: message, from: fromPhone, to })
    .then(msg => res.json({ success: true, sid: msg.sid }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
