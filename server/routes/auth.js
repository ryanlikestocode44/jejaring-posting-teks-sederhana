import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database/db.js';
import { registerUserValidation, loginUserValidation } from '../validators/validation.js';

const app = express();
const { JWT_SECRET, SESSION_EXPIRES = '7d' } = process.env;

app.post('/register', async (req, res) => {
    try {
        const validation = await registerUserValidation.validateAsync(req.body, { abortEarly: false });
        const { username, email, first_name, last_name, password } = validation;

        let user = await db.query(
            'SELECT user_id FROM pengguna u WHERE u.username = $1 or u.email = $2', 
            [username, email],
        );

        if (user.rows.length > 0 ){
            return res
                .status(401)
                .json({message: 'Username or email already used.'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const dbUser = await db.query(
            'INSERT INTO pengguna(username, email, first_name, last_name, password) values($1, $2, $3, $4, $5) RETURNING user_id, username',
            [username, email, first_name, last_name, hashedPassword],
        );

        console.log('Insert query result:', dbUser);
        
        user = { userID: dbUser.rows[0].user_id }
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: SESSION_EXPIRES });
        return res.status(200).json({message: 'Ok', token});
        
    } catch (err) {
        res.status(500).json({ message: 'Please insert valid information.', err });
    }
});

app.post('/login', async (req, res) => {
    try {
        const validation = await loginUserValidation.validateAsync(req.body, {abortEarly: false});
        const { username, password } = validation;
        
        const user = await db.query( 'SELECT * FROM pengguna WHERE username = $1', 
            [username]
        );
        
        if (user.rows[0] === 0) {
            return res
                .status(401)
                .json({message: 'Invalid username or password'})
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res
                .status(401)
                .json({message: 'Invalid username or password'})
        }

        const currentUser = {userID: user.rows[0].user_id};
        const token = jwt.sign(currentUser, JWT_SECRET, {expiresIn: SESSION_EXPIRES});
        
        res.status(200).header('auth-token', token).json({message: 'Ok', token});
    } catch (err) {
        res.status(500).json({message: 'Invalid username or password', err});
    }
});

export default app;