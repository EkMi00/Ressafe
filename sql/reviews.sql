USE ressafe;
DELETE FROM reviews;

INSERT INTO reviews (
    review_id,
    article_id,
    rating,
    comments,
    positive,
    negative,
    ambiguous,
    username,
    reviewDate
) VALUES
(
    'abcd1234',
    '1q87yvxa',
    'helpful',
    'This article provides detailed information about the budget approval process in Israel.',
    JSON_ARRAY('Reliable', 'Trustworthy'),
    JSON_ARRAY('Biased'),
    JSON_ARRAY('Controversial'),
    'John Doe',
    '2025-03-24'
),
(
    'efgh5678',
    '1q87yvxa',
    'not helpful',
    'This article lacks sufficient evidence and is biased.',
    JSON_ARRAY('Well-written'),
    JSON_ARRAY('Biased', 'Inaccurate'),
    JSON_ARRAY('Speculative'),
    'Jane Smith',
    '2025-03-25'
),
(
    'ijkl9012',
    '1q87yvxa',
    'helpful',
    'This article is well-researched and provides valuable insights.',
    JSON_ARRAY('Informative', 'Detailed'),
    JSON_ARRAY('Lengthy'),
    JSON_ARRAY('Complex'),
    'Alice Johnson',
    '2025-03-26'
),
(
    'mnop3456',
    '1q87yvxa',
    'not helpful',
    'The article is biased and lacks credible sources.',
    JSON_ARRAY('Engaging'),
    JSON_ARRAY('Biased', 'Unreliable'),
    JSON_ARRAY('Speculative'),
    'Bob Smith',
    '2025-03-27'
),
(
    'qrst7890',
    '1q87yvxa',
    'helpful',
    'A concise and accurate summary of the topic.',
    JSON_ARRAY('Accurate', 'Concise'),
    JSON_ARRAY('Limited Scope'),
    JSON_ARRAY('Neutral'),
    'Charlie Brown',
    '2025-03-28'
),
(
    'uvwx1234',
    '1q87yvxa',
    'not helpful',
    'The article contains outdated information.',
    JSON_ARRAY('Readable'),
    JSON_ARRAY('Outdated', 'Misleading'),
    JSON_ARRAY('Irrelevant'),
    'Diana Prince',
    '2025-03-29'
),
(
    'yzab5678',
    '1q87yvxa',
    'helpful',
    'The article provides a balanced perspective on the issue.',
    JSON_ARRAY('Balanced', 'Fair'),
    JSON_ARRAY('Dry Tone'),
    JSON_ARRAY('Controversial'),
    'Eve Adams',
    '2025-03-30'
),
(
    'cdef9012',
    '1q87yvxa',
    'not helpful',
    'The article is overly technical and hard to follow.',
    JSON_ARRAY('Thorough'),
    JSON_ARRAY('Technical', 'Confusing'),
    JSON_ARRAY('Ambiguous'),
    'Frank Castle',
    '2025-03-31'
),
(
    'ghij3456',
    '1q87yvxa',
    'helpful',
    'A great resource for understanding the topic.',
    JSON_ARRAY('Resourceful', 'Clear'),
    JSON_ARRAY('Repetitive'),
    JSON_ARRAY('Neutral'),
    'Grace Lee',
    '2025-04-01'
),
(
    'klmn7890',
    '1q87yvxa',
    'not helpful',
    'The article lacks depth and fails to address key points.',
    JSON_ARRAY('Readable'),
    JSON_ARRAY('Shallow', 'Incomplete'),
    JSON_ARRAY('Speculative'),
    'Hank Pym',
    '2025-04-02'
),
(
    'opqr1234',
    '1q87yvxa',
    'helpful',
    'The article is engaging and easy to understand.',
    JSON_ARRAY('Engaging', 'Accessible'),
    JSON_ARRAY('Simplistic'),
    JSON_ARRAY('Neutral'),
    'Ivy Green',
    '2025-04-03'
),
(
    'abcd5678',
    '1q87yvxa',
    'helpful',
    'The article is well-written and provides reliable information.',
    JSON_ARRAY('Reliable', 'Trustworthy'),
    JSON_ARRAY('Biased'),
    JSON_ARRAY('Controversial'),
    'Jack Sparrow',
    '2025-04-04'
),
(
    'efgh9012',
    '1q87yvxa',
    'not helpful',
    'The article is misleading and lacks proper evidence.',
    JSON_ARRAY('Accurate'),
    JSON_ARRAY('Misleading', 'Unreliable'),
    JSON_ARRAY('Speculative'),
    'Tony Stark',
    '2025-04-05'
),
(
    'ijkl3456',
    '1q87yvxa',
    'helpful',
    'A trustworthy and authoritative source of information.',
    JSON_ARRAY('Trustworthy', 'Authoritative'),
    JSON_ARRAY('Sensationalized'),
    JSON_ARRAY('Opinionated'),
    'Natasha Romanoff',
    '2025-04-06'
),
(
    'mnop7890',
    '1q87yvxa',
    'not helpful',
    'The article is biased and overly subjective.',
    JSON_ARRAY('Verified'),
    JSON_ARRAY('Biased', 'Inaccurate'),
    JSON_ARRAY('Subjective'),
    'Bruce Wayne',
    '2025-04-07'
),
(
    'qrst1234',
    '1q87yvxa',
    'helpful',
    'The article provides accurate and verified details.',
    JSON_ARRAY('Accurate', 'Verified'),
    JSON_ARRAY('Sensationalized'),
    JSON_ARRAY('Interpretive'),
    'Clark Kent',
    '2025-04-08'
),
(
    'uvwx5678',
    '1q87yvxa',
    'not helpful',
    'The article is unreliable and contains sensationalized claims.',
    JSON_ARRAY('Authoritative'),
    JSON_ARRAY('Unreliable', 'Sensationalized'),
    JSON_ARRAY('Speculative'),
    'Diana Prince',
    '2025-04-09'
),
(
    'yzab9012',
    '1q87yvxa',
    'helpful',
    'A reliable and accurate summary of the topic.',
    JSON_ARRAY('Reliable', 'Accurate'),
    JSON_ARRAY('Misleading'),
    JSON_ARRAY('Controversial'),
    'Steve Rogers',
    '2025-04-10'
),
(
    'cdef3456',
    '1q87yvxa',
    'not helpful',
    'The article is subjective and lacks proper verification.',
    JSON_ARRAY('Trustworthy'),
    JSON_ARRAY('Inaccurate', 'Unreliable'),
    JSON_ARRAY('Subjective'),
    'Peter Parker',
    '2025-04-11'
),
(
    'ghij7890',
    '1q87yvxa',
    'helpful',
    'The article is authoritative and provides verified insights.',
    JSON_ARRAY('Authoritative', 'Verified'),
    JSON_ARRAY('Biased'),
    JSON_ARRAY('Interpretive'),
    'Wanda Maximoff',
    '2025-04-12'
),
(
    'klmn1234',
    '1q87yvxa',
    'not helpful',
    'The article is speculative and lacks reliable sources.',
    JSON_ARRAY('Accurate'),
    JSON_ARRAY('Unreliable', 'Misleading'),
    JSON_ARRAY('Speculative'),
    'Scott Lang',
    '2025-04-13'
);