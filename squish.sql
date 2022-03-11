CREATE TABLE client (
    id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(80) NOT NULL,
    username VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE squish (
    id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(40) NOT NULL,
    size INTEGER NOT NULL,
    bio TEXT,
    squish_date DATE,
    purchase_date DATE, 
    created TIMESTAMPTZ NOT NULL,
    squish_owner INTEGER REFERENCES client(id) NOT NULL
);