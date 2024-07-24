import express from 'express';
import verify from './verifyToken.js';
import bcrypt from 'bcryptjs';
import db from '../database/db.js';

const app = express();

app.get('/profilePage', verify, async (req, res) => {
    try {
        const userInfo = await db.query('SELECT username, email, first_name, last_name FROM pengguna WHERE user_id = $1',
        [req.user.userID]);
        res.status(200).json(userInfo.rows);
    } catch (err) {
        res.status(500).json({message: 'Error getting user profile.'});
    }
});

app.get('/profilePage/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const result = await db.query(`
            SELECT username, email, first_name, last_name FROM pengguna
            WHERE username = $1
        `, [username]);

        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(404).json({message: 'User not found'})
    }
});

app.put('/profilePage/password', verify, async (req, res) => {
    try {
        const { password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(password, salt);

        const result = await db.query('UPDATE pengguna SET password = $1 WHERE user_id = $2',
            [hashedNewPassword, req.user.userID]
        );
        res.status(200).json({message: 'Password has changed.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to change password.' });
    }
});

export default app;