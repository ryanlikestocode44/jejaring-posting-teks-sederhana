import express from 'express';
import verify from './verifyToken.js';
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

export default app;