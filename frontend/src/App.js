import React, { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBBabkGrFDefZLPF2YD4uZMWxmLgvgVcMk",
  authDomain: "lifeline-24824.firebaseapp.com",
  projectId: "lifeline-24824",
  storageBucket: "lifeline-24824.firebasestorage.app",
  messagingSenderId: "779614270298",
  appId: "1:779614270298:web:982887520db9256388f963",
  measurementId: "G-7SQB1FPRM3"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

function App() {
  const [hospitals, setHospitals] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/hospitals?search=${search}`)
      .then(res => res.json())
      .then(setHospitals);

    fetch(`http://localhost:5000/api/volunteers?search=${search}`)
      .then(res => res.json())
      .then(setVolunteers);

    navigator.geolocation.getCurrentPosition(pos => {
      setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }, [search]);

  const handleLogin = () => {
    signInWithPopup(auth, provider).then(result => setUser(result.user));
  };

  const handleSOS = () => {
    const to = prompt("Enter emergency contact number (with country code):");
    const message = `Emergency! User needs help at location: https://maps.google.com/?q=${location.lat},${location.lng}`;
    fetch('http://localhost:5000/api/sos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, message })
    })
      .then(res => res.json())
      .then(data => alert(data.success ? "SOS sent successfully" : "Failed to send SOS"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 text-gray-900 font-sans">
      <header className="bg-gradient-to-r from-green-700 via-red-600 to-pink-600 text-white py-4 px-6 shadow-lg sticky top-0 z-50
">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold"> LifeLine</h1>
          <div className="flex gap-4">
            {!user ? (
              <button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium">
                Login with Google
              </button>
            ) : (
              <p className="text-green-100 font-semibold">Welcome, {user.displayName}</p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="🔍 Search hospitals or volunteers"
          />
        </div>

        {location && (
          <MapContainer center={[location.lat, location.lng]} zoom={13} className="h-[400px] rounded-lg mb-8 z-0">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[location.lat, location.lng]}>
              <Popup>You are here</Popup>
            </Marker>
            {hospitals.map(h => (
              <Marker key={h.id} position={[h.lat, h.lng]}>
                <Popup>
                  <strong>{h.name}</strong><br />{h.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        <button onClick={handleSOS} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-lg font-bold mb-10">
          🚨 Send SOS Alert
        </button>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-red-700">Available Volunteers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteers.map(v => (
              <div key={v.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold">{v.name}</h3>
                <p className="text-sm text-gray-600">📍 {v.location}</p>
                <p className="text-sm text-gray-600">📞 {v.phone}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 mt-10">
        © 2025 LifeLine. Built for ImpactMVP Hackathon.
      </footer>
    </div>
  );
}

export default App;
