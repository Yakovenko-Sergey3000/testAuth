CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    token TEXT
);


CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    text TEXT,
    img_url TEXT,
    user_id INTEGER REFERENCES users(id)
);