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
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
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
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-gradient-to-b from-red-50 via-slate-50 to-slate-200 text-gray-900"}>
      <header className={`${scrolled ? "shadow-lg bg-white/80 backdrop-blur" : "bg-white/90 backdrop-blur"} sticky top-0 z-50 border-b border-gray-200 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <div className="text-red-600 text-3xl">⛑️</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight dark:text-green">LifeLine</h1>
          </div>
          <div className="flex gap-4 items-center">
            <button onClick={() => setDarkMode(!darkMode)} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded shadow">
              {darkMode ? "🌞 Light" : "🌙 Dark"}
            </button>
            {!user ? (
              <button
                onClick={handleLogin}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition duration-200 font-semibold"
              >
                Login with Google
              </button>
            ) : (
              <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-200">Welcome, {user.displayName}</p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Landing Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 dark:text-green">Your Emergency Navigator</h2>
          <p className="text-lg text-blue-600 dark:text-black-300 max-w-2xl mx-auto">
            Find help fast. Locate hospitals, volunteers, and send SOS alerts in one tap. LifeLine saves lives when seconds count.
          </p>
        </section>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-lg dark:bg-gray-800 dark:text-white"
            placeholder="🔍 Search hospitals or volunteers"
          />
        </div>

        {location && (
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={13}
            className="h-[400px] w-full rounded-lg shadow mb-10 z-0"
          >
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

        <button
          onClick={handleSOS}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-lg font-bold mb-12 shadow-md"
        >
          🚨 Send SOS Alert
        </button>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-400">Available Volunteers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteers.map(v => (
              <div key={v.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition-all dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{v.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">📍 {v.location}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">📞 {v.phone}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 text-center text-sm text-gray-600 dark:text-gray-400 py-6 mt-12">
        © 2025 LifeLine. Built with ❤️ for ImpactMVP Hackathon.
      </footer>
    </div>
  );
}

export default App;
