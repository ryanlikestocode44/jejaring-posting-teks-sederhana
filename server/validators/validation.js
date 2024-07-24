// Validasi
import Joi from 'joi'

// Validasi Register
const username = Joi.string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z]+(?:[_-]?[a-zA-Z])/)
    .required()
    .label('Please insert a valid username.');

const email = Joi.string()
    .email()
    .min(3)
    .max(50)
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .label('Insert a valid email');

const first_name = Joi.string()
    .alphanum()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z ]+$/)
    .required()
    .label('First Name must not contain numbers');

const last_name = Joi.string()
    .alphanum()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z ]+$/)
    .required()
    .label('Last Name must not contain numbers');

const password = Joi.string()
    .min(8)
    .required()
    .label('Password must contain at least 8 karakter.');


const registerUserValidation = Joi.object().keys({
    username: username,
    email: email,
    first_name: first_name,
    last_name: last_name,
    password: password,
});
    
const loginUserValidation = Joi.object().keys({
    username: username,
    password: password,
});

export { registerUserValidation, loginUserValidation };