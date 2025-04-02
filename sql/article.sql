USE ressafe;

DELETE FROM articles;

-- Article 1: Summary of Trump's comments on Zelensky
INSERT INTO articles (article_id, url, summary, date, comment) VALUES 
('00000001', 'https://www.breitbart.com/europe/2025/02/19/president-trump-blasts-zelensky-a-dictator-without-elections/', 
 'The article reports on Trump’s criticism of Zelensky, describing him as a dictator due to the lack of elections in Ukraine.', 
 '2025-02-19 12:00:00',
 'Trump’s bold remarks on Zelensky challenge the global narrative on Ukraine’s leadership and raise questions about democratic values.'
);

-- Article 2: Summary of BBC documentary controversy
INSERT INTO articles (article_id, url, summary, date, comment) VALUES 
('00000002', 'https://www.oann.com/newsroom/bbc-faces-backlash-over-gaza-documentary-featuring-hamas-officials-son-in-positive-light/', 
 'The article discusses backlash against a BBC documentary that features the son of a Hamas official in a positive light.', 
 '2025-02-20 12:00:00',
 'The BBC’s controversial portrayal of a Hamas official’s son has sparked outrage, with critics accusing the network of bias.'
);

-- Article 3: Summary of Finland’s efforts against fake news
INSERT INTO articles (article_id, url, summary, date, comment) VALUES 
('00000003', 'https://edition.cnn.com/interactive/2019/05/europe/finland-fake-news-intl', 
 'The article examines Finland’s strategies to combat the spread of fake news and misinformation.', 
 '2025-02-21 12:00:00',
 'Finland’s innovative approach to fighting fake news positions the country as a global leader in combating misinformation.'
);

-- Article 4: Summary of Fox News and Dominion lawsuit
INSERT INTO articles (article_id, url, summary, date, comment) VALUES 
('00000004', 'https://apnews.com/article/fox-news-dominion-lawsuit-trial-trump-2020-0ac71f75acfacc52ea80b3e747fb0afe', 
 'The article provides details on the legal battle between Fox News and Dominion over allegations related to the 2020 election.', 
 '2025-02-22 12:00:00',
 'The lawsuit between Fox News and Dominion highlights the ongoing battle over media accountability and election integrity.'
);

-- Article 5: Summary of Musk’s leadership conflicts
INSERT INTO articles (article_id, url, summary, date, comment) VALUES 
('00000005', 'https://www.politico.com/news/2025/02/23/musk-guidance-conflict-agency-leaders-00205640', 
 'The article highlights conflicts between Elon Musk and agency leaders over guidance and decision-making.', 
 '2025-02-23 12:00:00',
 'Elon Musk’s leadership style continues to divide opinions, with some praising his boldness and others criticizing his confrontational tactics.'
);


INSERT INTO articles (article_id, url, summary, date, comment) VALUES 
('1q87yvxa', 'https://www.straitstimes.com/world/middle-east/israel-panel-approves-2025-budget-set-for-final-vote-in-parliament-by-end-march', 
 'The article outlines the steps taken by Israel’s parliament to approve the 2025 budget.', 
 '2025-02-25 12:00:00',
 "The article from The Straits Times titled 'Israel panel approves 2025 budget, set for final vote in parliament by end-March' reports on the Israeli government's budget approval process."
);