import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/Register.css';
import './Styles/Home.css';
import './Styles/Header.css';
import { useEffect, useState } from 'react';
import { Get } from './Components/Get';
import { Give } from './Components/Give';
import { Register } from './Register/Register';
import { Login } from './Register/Login';
import { Home } from './Components/Home';
import { Logaut } from './Components/Logaut';
import { Route, Routes } from 'react-router-dom';
import { MeProfile } from './Components/MeProfile';
import { Header } from './Components/Header';

function App() {

  const listprofile = "bages"
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem(listprofile)) || [])

  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Logaut setProfile={setProfile} listprofile={listprofile} />} />
      <Route path="Home" element={<Home profile={profile} />} />
      <Route path="MeProfile" element={<MeProfile setProfile={setProfile} listprofile={listprofile} profile={profile} />} />
    </Routes>
    </div>
  );
}

export default App;
