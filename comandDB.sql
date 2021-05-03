CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    token TEXT
);


CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    text TEXT,
    img_url TEXT,
    date timestamp not null default CURRENT_DATE,
    user_id INTEGER REFERENCES users(id)
);