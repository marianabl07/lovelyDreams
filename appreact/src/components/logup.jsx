import React, { useState } from 'react';
import '../styles/styleLogup.css';
import 'bootstrap';







const Logup = () => {
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const expressions = {
    completeName: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
    lastname: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+/,
    password: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/,
    address: /^[A-Za-z0-9_-\s]+/,
  };

  const field = {
    name: false,
    lastname: false,
    email: false,
    password: false,
    confirmPassword: false,
    address: false,
  };

  const validateField = (expression, inputName, inputValue) => {
    if (expression.test(inputValue)) {
      setFieldErrors({ ...fieldErrors, [inputName]: '' });
      field[inputName] = true;
    } else {
      setFieldErrors({
        ...fieldErrors,
        [inputName]: `Invalid ${inputName}`,
      });
      field[inputName] = false;
    }
  };

  const validatePassword = () => {
    if (form.password === form.confirmPassword) {
      setFieldErrors({ ...fieldErrors, password: '', confirmPassword: '' });
      field.password = true;
      field.confirmPassword = true;
    } else {
      setFieldErrors({
        ...fieldErrors,
        password: 'Passwords must match',
        confirmPassword: 'Passwords must match',
      });
      field.password = false;
      field.confirmPassword = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(field).every((value) => value)) {
      setSuccessMessage('Registration successful');

      //  solicitud a un servidor.

      setForm({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
      });
    }
  };

  return (
    <div className="logup">
      <div className="form-container">
        <h1 className="title">My account</h1>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <div id="group-name">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Ariana"
                name="name"
                className={`input input-name ${
                  field.name ? 'correct' : field.name === false ? 'invalid' : ''
                }`}
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  validateField(expressions.completeName, 'name', e.target.value);
                }}
              />
              {fieldErrors.name && (
                <p className="form-input-error">{fieldErrors.name}</p>
              )}
            </div>

            <div id="group-lastname">
              <label htmlFor="lastname" className="label">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Martinez"
                name="lastname"
                className={`input input-lastname ${
                  field.lastname
                    ? 'correct'
                    : field.lastname === false
                    ? 'invalid'
                    : ''
                }`}
                value={form.lastname}
                onChange={(e) => {
                  setForm({ ...form, lastname: e.target.value });
                  validateField(
                    expressions.lastname,
                    'lastname',
                    e.target.value
                  );
                }}
              />
              {fieldErrors.lastname && (
                <p className="form-input-error">{fieldErrors.lastname}</p>
              )}
            </div>

            <div id="group-email">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="lovelydreams@example.com"
                name="email"
                className={`input input-email ${
                  field.email ? 'correct' : field.email === false ? 'invalid' : ''
                }`}
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  validateField(expressions.email, 'email', e.target.value);
                }}
              />
              {fieldErrors.email && (
                <p className="form-input-error">{fieldErrors.email}</p>
              )}
            </div>

            <div id="group-password">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                name="password"
                className={`input input-password ${
                  field.password
                    ? 'correct'
                    : field.password === false
                    ? 'invalid'
                    : ''
                }`}
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  validateField(expressions.password, 'password', e.target.value);
                }}
              />
              {fieldErrors.password && (
                <p className="form-input-error">{fieldErrors.password}</p>
              )}
            </div>

            <div id="group-password2">
              <label htmlFor="confirm-password" className="label">
                Confirm password
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="********"
                name="confirmPassword"
                className={`input input-password ${
                  field.confirmPassword
                    ? 'correct'
                    : field.confirmPassword === false
                    ? 'invalid'
                    : ''
                }`}
                value={form.confirmPassword}
                onChange={(e) => {
                  setForm({ ...form, confirmPassword: e.target.value });
                  validatePassword();
                }}
              />
              {fieldErrors.confirmPassword && (
                <p className="form-input-error">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            <div id="group-address">
              <label htmlFor="address" className="label">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Carrera 19 norte 10-65"
                name="address"
                className={`input input-address ${
                  field.address
                    ? 'correct'
                    : field.address === false
                    ? 'invalid'
                    : ''
                }`}
                value={form.address}
                onChange={(e) => {
                  setForm({ ...form, address: e.target.value });
                  validateField(expressions.address, 'address', e.target.value);
                }}
              />
              {fieldErrors.address && (
                <p className="form-input-error">{fieldErrors.address}</p>
              )}
            </div>
          </div>
          <div className="form-btn-send">
            <input
              type="submit"
              value="Log up"
              className="primary-button logup-button"
            />
            {successMessage && (
              <p className="form-successful">{successMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Logup;
