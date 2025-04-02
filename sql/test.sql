USE ressafe;

SELECT * 
FROM articles
ORDER BY date DESC
LIMIT 6;

USE ressafe;
SELECT * 
FROM reviews
WHERE article_id = '00000005'
ORDER BY reviewDate DESC;

USE ressafe;
SELECT EXISTS (
    SELECT 1 
    FROM articles 
    WHERE article_id = "1q87yvxa"
);