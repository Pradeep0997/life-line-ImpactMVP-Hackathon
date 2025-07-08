# 🔴 LifeLine - Emergency Aid Navigator



A real-time Progressive Web Application (PWA) that connects users with nearby hospitals and volunteers during emergencies. LifeLine integrates geolocation, Google sign-in, Firebase, Twilio SMS alerts, and an intuitive UI to deliver fast, reliable aid with a single click.

---

# 🚀 Features

- 🗺️ **Live Map View** using Leaflet to show nearby hospitals and volunteers  
- 🔍 **Search Functionality** for hospitals and volunteers  
- 📍 **Location-Based Assistance** using browser GPS  
- 🆘 **One-Click SOS Alert** via Twilio to emergency contact numbers  
- 🔐 **Google Authentication** with Firebase  
- 💬 **Responsive UI** built with Tailwind CSS for mobile & desktop  
- 🌐 **PWA Support** for offline functionality and installable app  
- ☁️ **Backend API** built with Node.js and Express.js  
- 🔄 **Firebase Real-Time Sync** of hospital and volunteer data  

---

# 🏗️ Tech Stack

| Category       | Technology                                      |
|----------------|--------------------------------------------------|
| **Frontend**   | React.js, Tailwind CSS, React-Leaflet, Firebase Auth |
| **Backend**    | Node.js, Express.js                              |
| **Database**   | Firebase (or JSON for simulation)                |
| **Auth**       | Firebase Authentication (Google Sign-In)         |
| **Cloud**      | Firebase Hosting (optional), Vercel              |
| **APIs**       | Twilio SMS API                                   |
| **Other**      | PostCSS, PWA (serviceWorker), dotenv             |

---

# 📦 Folder Structure

```bash
lifeline-app/
├── backend/
│   ├── data/
│   │   ├── hospitals.json
│   │   └── volunteers.json
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── ...
│   ├── postcss.config.js
│   └── tailwind.config.js
└── README.md

```
---

# ⚙️ Setup & Installation


1. Clone the repository


git clone https://github.com/your-username/life-line-ImpactMVP-Hackathon.git


cd lifeline-app


2. Setup backend


cd backend

npm install

 Create .env and add:
 
 TWILIO_SID=your_sid
 
 TWILIO_AUTH=your_auth_token
 
 TWILIO_PHONE=+your_twilio_number

node server.js


# 3. Setup frontend

cd ../frontend

npm install

npm start

---

# 🆘 How It Works


User opens app → Location is detected via browser

Map renders nearby hospitals & volunteers from backend

User logs in with Google (optional)

Press SOS Alert → Twilio sends SMS to a saved emergency number

Volunteers list shown dynamically from backend


---


# 🖼️ Screenshots


![life-line1](https://github.com/user-attachments/assets/9e950512-a5ef-450d-b411-1d0caa6bf63f)


![life-line2](https://github.com/user-attachments/assets/f4ba4cb4-303a-449b-b9c9-dd54dc248c9e)


![life-line3](https://github.com/user-attachments/assets/b6631ee9-2b68-4177-9c21-d955672bbfa6)


![life-line4](https://github.com/user-attachments/assets/47e0aa33-72fe-492c-9810-d72828c92d06)


![life-line5](https://github.com/user-attachments/assets/f9459642-a66a-4b97-84e2-192ffff0ecb5)


![life-line6](https://github.com/user-attachments/assets/baf23367-480b-4329-af50-0924f3011586)



---


## 🔐 Environment Variables


Create a .env file in backend/:


TWILIO_SID=your_twilio_sid

TWILIO_AUTH=your_twilio_auth_token

TWILIO_PHONE=+1234567890

⚠️ Make sure .env is listed in your .gitignore file!


---

#  Future Improvements


🗣️ Add voice input for accessibility

🧭 Navigation support to hospitals using Google Maps API

📱 SMS confirmation for volunteers

🔒 Role-based login (admin/volunteer/user)

📊 Dashboard to monitor emergency requests


---

# 🎯 Use Cases


Disaster zones with disrupted communication

Elderly or disabled users needing quick help

NGOs coordinating rescue efforts


---

# 📜 License


This project is open-source under the MIT License.


---

# 🙌 Acknowledgements


Firebase

Twilio

React

Leaflet Maps

Tailwind CSS


---

# 👤 Author


Settipalle Pradeep Reddy


🔗 LinkedIn
🔗 GitHub
