import express from 'express';
import verify from './verifyToken.js'
import db from '../database/db.js'

const app = express();

// Membuat postingan pengguna
app.post('/posts', verify, async (req, res) => {
    try {
        const { description } = req.body;

        const newPost = await db.query('INSERT INTO post(user_id, description, datetime) VALUES($1, $2, CURRENT_TIMESTAMP) RETURNING *',
        [req.user.userID, description]);
        
        res.status(200).json(newPost.rows[0]);
        
    } catch (err) {
        res.status(500).json({ message: 'Unable to upload post' });
    }
});

// Mendapatkan postingan pengguna
app.get('/myPosts', verify, async (req, res) => {
    try {
        const allPosts = await db.query('SELECT * FROM post WHERE user_id = $1',
        [req.user.userID]);

        res.status(200).json(allPosts.rows);
    } catch (err) {
        res.status(500).json({message: 'Unable to get user posts'});
    }
});

// Menghapus postingan pengguna
app.delete('/posts/:postID', verify, async (req, res) => {
    try {
        const {postID} = req.params;
        const deletePost = await db.query('DELETE FROM post WHERE user_id = $1 and post_id = $2',
        [req.user.userID, postID]);

        res.status(200).json({message: 'Post deleted.'});
    } catch (err) {
        res.status(500).json({message: 'Failed to delete post.'});
    }
});

// Mengubah postingan pengguna
app.put('/posts/:postID', verify, async (req, res) => {
    try {
        const { description } = req.body;
        const { postID } = req.params;

        const updatePost = await db.query('UPDATE post SET description = $1, edited = true WHERE user_id = $2 and post_id = $3',
        [description, req.user.userID, postID]);

        res.status(200).json({message: 'Success Updating Post.'});
    } catch (err) {
        res.status(500).json({message: 'Failed to update post'});
    }
});

// Mendapatkan semua postingan
app.get('/posts', async (req, res) =>{
    try {
        const allPosts = await db.query('SELECT * FROM post');

        res.status(200).json(allPosts.rows);
    } catch (err) {
        res.status(500).json({message: 'Failed to get posts.'});
    }
});

// Mendapatkan semua reply dari postingan terkait
app.get('/posts/:postID', async (req, res) =>{
    try {
        const { postID } = req.params;

        const allReplies = await db.query('SELECT * FROM reply WHERE post_id = $1', 
        [postID]);

        res.status(200).json(allReplies.rows);
    } catch (err) {
        res.status(500).json({message: 'Failed to get post replies.'});
    }
});

export default app;