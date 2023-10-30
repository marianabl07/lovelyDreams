import React, { useState } from 'react';
import 'bootstrap';
import '../styles/styleLogin.css';
import LovelyDreamsLogo from '../Icons/Lovely Dreams Logo.png'
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warnings, setWarnings] = useState([]);
  // Cambiamos el estado 'warnings' a un array

  const handleSubmit = (e) => {
    e.preventDefault();
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let regexPassword = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

    let newWarnings = [];
    let open = false;

    if (!regexEmail.test(email)) {
      newWarnings.push('Must be in a valid email format.');
      open = true;
    }

    if (!regexPassword.test(password)) {
      newWarnings.push('Password must be more than 8 characters and include an uppercase letter, a lowercase letter, a special character, and a number.');
      open = true;
    }

    setWarnings(newWarnings);

    if (open) {
      newWarnings.push('Failed login.');
   } else {
      newWarnings.push('Successful login.');
      let data = {
        emailData: email,
        passwordData: password,
      };
      fetch("localhost/Login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  };

  return (
    <div>
      <nav id="menu">
        <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Log in</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="homepage">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="logup">Log up</a>
            </li>
          </ul>
    </nav>
    <div className="login">
      <div className="form-container">
        <img src={LovelyDreamsLogo} alt="logo" className="logo" />

        <form onSubmit={handleSubmit} className="form" id="form">
          <label htmlFor="email" className="label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            placeholder="lovelydreams@example.com"
            className="input input-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="*********"
            className="input input-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" value="Log in" className="primary-button login-button" />
          <a href="/">Forgot password?</a>
        </form>

        <button className="secondary-button logup-button">Log up</button>
        <ul className="warnings" id="warnings">
          {warnings.map((warning, index) => (
            <li key={index}>{warning}</li>
          ))}
        </ul>
      </div>
    </div>
    </div>

  );
}

export default Login;
