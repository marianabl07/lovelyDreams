const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');


const expressions = {
    completeName: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
    lastname: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
    password: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
    address: /^[A-Za-z0-9_-\s]+$/
    
}

const field = {
    name: false,
    lastname: false,
    password: false,
    email: false,
    address: false,
}


const validateForm = (e) => {
   switch (e.target.name) {
    case 'name':
        validateField(expressions.completeName, e.target, 'name');
    break;
    case 'lastname':
        validateField(expressions.lastname, e.target, 'lastname')
    break;
    case 'email':
        validateField(expressions.email, e.target, 'email');
    break;
    case 'password':
        validateField(expressions.password, e.target, 'password');
        validatePassword();
    break;

    case 'confirm-password':
        validatePassword();
    break;
    case 'address':
        validateField(expressions.address, e.target, 'address');
    break;
    
   }
}


const validateField = (expression, input, fieldValidate) => {
            const errorElement = document.querySelector(`#${fieldValidate} + .form-input-error`);
            debugger;
            if(expression.test(input.value)) {
                document.getElementById(`${fieldValidate}`).classList.remove('invalid');
                document.getElementById(`${fieldValidate}`).classList.add('correct');
                errorElement.style.display = 'none'; // Oculta el mensaje de error
                field[fieldValidate] = true;

            } else {
                document.getElementById(`${fieldValidate}`).classList.add('invalid');
                document.getElementById(`${fieldValidate}`).classList.remove('correct');
                errorElement.style.display = 'block'; // Muestra el mensaje de error
                field[fieldValidate] = false;
            }
        }

const validatePassword = () => {
const inputPassword1 = document.getElementById('password');
const inputPassword2 = document.getElementById('confirm-password');
const errorElement = document.querySelector('#confirm-password + .form-input-error');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById('confirm-password').classList.add('invalid');
        document.getElementById('confirm-password').classList.remove('correct');
        errorElement.style.display = 'block'; // Muestra el mensaje de error
        field['password'] = false;
    } else {
        document.getElementById('confirm-password').classList.remove('invalid');
        document.getElementById('confirm-password').classList.add('correct');
        errorElement.style.display = 'none'; // Oculta el mensaje de error
        field['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});


form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (field.password && field.address && field.name && field.lastname && field.email) {
            form.reset();

                // Mostrar el mensaje de éxito al dar clic en el botón "Log up"
                document.getElementById('form-successful').classList.add('form-successful-active');
                setTimeout(() => {
                    document.getElementById('form-successful').classList.remove('form-successful-active');
                }, 5000);
            }
        });

