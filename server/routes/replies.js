import express from 'express';
import verify from './verifyToken.js';
import db from '../database/db.js';

const app = express();

// Posting reply pengguna
app.post('/posts/reply/:postID', verify, async (req, res) => {
    try {
        const { description } = req.body;
        const { postID } = req.params;
        const newReply = await db.query('INSERT INTO reply(post_id, user_id, description, datetime) VALUES($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
        [postID, req.user.userID, description]);
        res.status(200).json(newReply.rows[0]);
    } catch (err) {
        res.status(500).json({message: 'Unable to reply to post'});
    }
});

// Mendapatkan semua reply pengguna
app.get('/myReplies', verify, async (req, res) => {
    try {
        const allReplies = await db.query(`
            SELECT r.*, p.username
            FROM reply r
            JOIN pengguna p ON r.user_id = p.user_id
            WHERE r.user_id = $1
        `, [req.user.userID]);
        res.status(200).json(allReplies.rows);
    } catch (err) {
        res.status(500).json({message: 'Unable to retrieve replies'});
    }
});

// Menghapus reply pengguna
app.delete('/posts/reply/:replyID', verify, async (req, res) => {
    try {
        const { replyID } = req.params;
        const deleteReply = await db.query('DELETE FROM reply WHERE user_id = $1 and reply_id = $2',
        [req.user.userID, replyID]);
        res.status(200).json({message: 'reply was deleted.'});
    } catch (err) {
        res.status(500).json({message: 'Failed to delete reply'});
    }
});

// Mengubah reply pengguna
app.put('/posts/reply/:replyID', verify, async (req, res) => {
    try {
        const { description } = req.body;
        const { replyID } = req.params;
        const updateReply = await db.query('UPDATE reply SET description = $1, edited = true WHERE user_id = $2 and reply_id = $3',
        [description, req.user.userID, replyID]);
        res.status(200).json({ message: 'Reply was updated.' })
    } catch (err) {
        res.status(500).json({ message: 'Failed to edit reply' });
    }
});

export default app;