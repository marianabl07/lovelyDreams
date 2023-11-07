import React, { useState } from 'react';
import '../styles/styleLogup.css';
import 'bootstrap';
import { useNavigate } from 'react-router-dom';


const expressions = {
  name: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
  lastname: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
  password: /(?=.*\d)(?=.*[!@#$%^&*()\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/,
  address: /^[A-Za-z0-9_-\s]+/,
};

const Logup = () => {
  const initialFormData = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({ ...initialFormData });
  const [formSuccess, setFormSuccess] = useState(false);
  const navigate = useNavigate();

  const validateField = (inputName, value) => {
    if (expressions[inputName].test(value)) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [inputName]: '' }));
      return true;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, [inputName]: `Invalid ${inputName}` }));
      return false;
    }
  };

  const validatePassword = () => {
    if (formData.password == formData.confirmPassword) {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: '', confirmPassword: '' }));
      return true;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: 'Passwords do not match', confirmPassword: 'Passwords do not match' }));
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'confirmPassword') {
      validatePassword();
    } else {
      validateField(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    for (const field in formData) {
      if (field === 'confirmPassword') {
        valid = valid && validatePassword();
      } else {
        valid = valid && validateField(field, formData[field]);
      }
    }

    if (valid) {

      let data = formData
      fetch("http://localhost:4000/users/logup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then ((response) => {
        if(response.status == 200) {
          setFormSuccess(true);
          setTimeout(() => {
          setFormSuccess(false);
          setFormData(initialFormData);
          setFormErrors({ ...initialFormData });
        }, 5000);
        navigate("/login");
        }
      });
    }
  };

  return (
    <div className='all'>
      <nav id="menu">
        <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Log up</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="homepage">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="login">Log in</a>
            </li>
          </ul>
    </nav>
      <div className="logup">
        <div className="form-container">
          <h1 className="title">My account</h1>
          <form onSubmit={handleSubmit} className="form" id="form">
            <div>
              {Object.keys(initialFormData).map((inputName) => (
                <div key={inputName} className={`input-group input-group-${inputName}`}>
                  <label className="label" htmlFor={inputName}>
                    {inputName.charAt(0).toUpperCase() + inputName.slice(1)}
                  </label>
                  <input
                    type={inputName === 'password' || inputName === 'confirmPassword' ? 'password' : 'text'}
                    id={inputName}
                    placeholder={`Enter your ${inputName}`}
                    name={inputName}
                    className={`input input-${inputName} ${formErrors[inputName] ? 'invalid' : ''}`}
                    value={formData[inputName]}
                    onChange={handleInputChange}
                  />
                  <p className={`form-input-error ${formErrors[inputName] ? 'form-input-error-active' : ''}`}>
                    {formErrors[inputName]}
                  </p>
                </div>
              ))}
            </div>
            <div className="form-btn-send">
              <input type="submit" value="Log up" className="primary-button logup-button" />
              <p className={`form-successful ${formSuccess ? 'form-successful-active' : ''}`} id="form-successful">
                {formSuccess ? 'Successful registration' : ''}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Logup;