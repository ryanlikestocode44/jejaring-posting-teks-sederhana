CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE pengguna(
    user_id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    username VARCHAR(20),
    email VARCHAR(50) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE post(
    post_id SERIAL PRIMARY KEY NOT NULL,
    user_id UUID references pengguna(user_id),
    description TEXT NOT NULL,
    datetime TIMESTAMPTZ NOT NULL,
    edited BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE reply(
    reply_id SERIAL PRIMARY KEY NOT NULL,
    post_id INTEGER references post(post_id) NOT NULL,
    user_id UUID references pengguna(user_id) NOT NULL,
    description TEXT NOT NULL,
    datetime TIMESTAMPTZ NOT NULL,
    edited BOOLEAN NOT NULL DEFAULT 'false'
);

SELECT * FROM pengguna;
-- ALTER TABLE users
-- ADD CONSTRAINT check_email_min_len check (length(email) >= 10),
-- ADD CONSTRAINT check_password_min_len check (length(password) >= 6);