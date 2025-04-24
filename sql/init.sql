DROP SCHEMA IF EXISTS ressafe;
CREATE SCHEMA ressafe; 

USE ressafe;

-- CREATE TABLE IF NOT EXISTS users (
-- 	user_id CHAR(8) PRIMARY KEY CHECK (LENGTH(user_id) = 8),
--     email VARCHAR(32) UNIQUE NOT NULL,
--     username VARCHAR(32) UNIQUE NOT NULL
-- );


CREATE TABLE IF NOT EXISTS articles (
    article_id CHAR(8) PRIMARY KEY CHECK (LENGTH(article_id) = 8),
    url VARCHAR(255) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    comment VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id CHAR(8) PRIMARY KEY CHECK (LENGTH(review_id) = 8),
    article_id CHAR(8) NOT NULL REFERENCES article(article_id),
    username VARCHAR(32) NOT NULL,
    -- user_id CHAR(8) NOT NULL REFERENCES users(user_id),
    -- ratingScore DECIMAL(2,2) NOT NULL CHECK (ratingScore >= 1.0 AND ratingScore <= 5.0),
    rating VARCHAR(32) NOT NULL,
    comments TEXT,
    positive JSON,
    negative JSON,
    ambiguous JSON,
    reviewDate DATE NOT NULL
);