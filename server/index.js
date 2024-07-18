import express from 'express';
import cors from 'cors';
import db from './database/db.js';

const app = express()

db.connect()
.then(() => {console.log('Connected to PostgreSQL Database.'); })
.catch(async (err) => {
    console.error(err);
    await db.end();
});

const port = 4000;
const database = "forum_pern";

// Middleware
app.use(cors());

app.use(express.json());

// Import Routes
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import replyRoute from './routes/replies.js'
import profilePageRoute from './routes/userProfile.js'

// Route Middleware
app.use('/', authRoute);
app.use('/', postRoute);
app.use('/', replyRoute);
app.use('/', profilePageRoute);

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});