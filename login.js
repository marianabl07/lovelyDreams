const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('form');
const paragraph = document.getElementById('warnings');




form.addEventListener('submit', e=> {
    e.preventDefault();
    let warnings = "";
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let regexPassword = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/; 
    let open = false;
    paragraph.innerHTML = "";
    if(!regexEmail.test(email.value)){
        warnings += `Must be in valid format. <br>`;
        open = true;
    }

    if(!regexPassword.test(password.value)){
        warnings += `Must be more than 8 characters and include an uppercase letter, a lowercase letter, a special character and a number. <br>`;
        open = true;
    }

    if (open) {
        paragraph.innerHTML = warnings;
    } else {
        form.reset();
        paragraph.innerHTML ='Successful login.';
    }
})