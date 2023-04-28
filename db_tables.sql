-- Active: 1682482272539@@149.129.241.190@5432@bayu02@public
CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    fullname VARCHAR,
    email VARCHAR,
    password VARCHAR,
    phone VARCHAR DEFAULT NULL,
    city VARCHAR DEFAULT NULL,
    country VARCHAR DEFAULT NULL,
    postalcode VARCHAR DEFAULT NULL,
    photo VARCHAR DEFAULT 'https://res.cloudinary.com/dedas1ohg/image/upload/v1680685005/peworld_images/Default_pfp_odp1oi_ockrk2.png',
    role VARCHAR DEFAULT 'customer',
    otp VARCHAR,
    verified BOOLEAN DEFAULT false
);

CREATE TABLE airlines (
    id VARCHAR PRIMARY KEY,
    airline_name VARCHAR,
    photo VARCHAR
);

CREATE TABLE tickets (
    id VARCHAR PRIMARY KEY,
    airlines_id VARCHAR,
	departure_city VARCHAR,
	arrival_city VARCHAR,
	departure_country VARCHAR,
	arrival_country VARCHAR,
    departure_date TIMESTAMP,
    arrival_date TIMESTAMP,
    transit VARCHAR,
    facilities INTEGER,
    price DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE bookings (
    id VARCHAR PRIMARY KEY,
    tickets_id VARCHAR,
    users_id VARCHAR,
    passengers INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL
);