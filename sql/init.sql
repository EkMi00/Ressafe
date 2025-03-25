DROP SCHEMA IF EXISTS reviews;
CREATE SCHEMA reviews; 

USE reviews;

CREATE TABLE IF NOT EXISTS users (
	user_id CHAR(10) PRIMARY KEY CHECK (LENGTH(user_id) = 10),
    email VARCHAR(32) UNIQUE NOT NULL,
    username VARCHAR(32) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id CHAR(16) NOT NULL PRIMARY KEY CHECK (LENGTH(review_id) = 8),
    ratingScore DECIMAL(2,2) NOT NULL CHECK (ratingScore >= 1.0 AND ratingScore <= 5.0),
    user_id CHAR(10) NOT NULL REFERENCES users(user_id),
    rating CHAR(10) NOT NULL,
    comments VARCHAR(255),
    positive JSON,
    negative JSON,
    ambiguous JSON,
    reviewDate DATE NOT NULL
);