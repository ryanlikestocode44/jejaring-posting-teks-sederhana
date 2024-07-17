// Validasi
import Joi from 'joi'

// Validasi Register
const email = Joi.string()
    .email()
    .min(3)
    .max(50)
    .required()
    .label('Insert a valid email');

const first_name = Joi.string()
    .alphanum()
    .min(1)
    .max(100);

const last_name = Joi.string()
    .alphanum()
    .min(1)
    .max(100);

const password = Joi.string()
    .regex(/[a-zA-Z0-9]{8,}$/)
    .required()
    .label('Password must contain at least 8 karakter.');

const username = Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .label('Please insert a valid username.');

const registerUserValidation = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().required(),
});
    
const loginUserValidation = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export { registerUserValidation, loginUserValidation };