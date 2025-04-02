import apisauce from 'apisauce';

// ? REST API functions to communicate with your database backend
// ? Machine IP - replace with your server's IP address; run `ifconfig` and take the first inet IP address (should be below ens32)
const machineIP = "127.0.0.1";
// const machineIP = "172.25.77.198";
const machinePort = "8000";
export const api = apisauce.create({
    baseURL: import.meta.env.VITE_SERVER_URL || `http://${machineIP}:${machinePort}`, // Use the server URL from environment variables or default to localhost
});

// Method to fetch reviews from the /reviews endpoint
export const getReviews = async () => {
    try {
        const response = await api.get('/reviews', {}, {
            headers: {
                'ngrok-skip-browser-warning': '69420', // Skip ngrok's browser warning
            },
        });

        if (response.ok) {
            return response.data.data; // Return the reviews data
        } else {
            throw new Error(`Error fetching reviews: ${response.problem}`);
        }
    } catch (error) {
        console.error("Error in getReviews:", error);
        throw error;
    }
};

// Method to add a review to the /add_review endpoint
export const addArticle = async (articleData) => {
    try {
        // Construct query parameters using URLSearchParams
        const params = new URLSearchParams({
            article_id: articleData.article_id,
            date: articleData.date,
            url: articleData.url,
            summary: articleData.summary,
            comment: articleData.comment,
            rating: articleData.rating,
        });

        // Construct the full URL with query parameters
        const url = `/add_article?${params.toString()}`;

        // Send the POST request
        const response = await api.post(url, {}, {
            headers: {
                'ngrok-skip-browser-warning': '69420', // Skip ngrok's browser warning
            },
        });

        if (response.ok) {
            return response.data; // Return the success message
        } else {
            throw new Error(`Error adding review: ${response.problem}`);
        }
    } catch (error) {
        console.error("Error in addReview:", error);
        throw error;
    }
};

// Method to fetch a specific review by its ID from the /review/{id} endpoint
export const getArticleById = async (articleId) => {
    try {
        // Construct the full URL with the review ID
        const url = `/article/${articleId}`;

        // Send the GET request
        const response = await api.get(url, {}, {
            headers: {
                'ngrok-skip-browser-warning': '69420', // Skip ngrok's browser warning
            },
        });

        if (response.ok) {
            return response.data.data; // Return the review data
        } else {
            throw new Error(`Error fetching review by ID: ${response.problem}`);
        }
    } catch (error) {
        console.error("Error in getReviewById:", error);
        throw error;
    }
};

// Method to fetch reviews for a specific article by its ID from the /reviews/{article_id} endpoint
export const getReviewById = async (articleId) => {
    try {
        // Construct the full URL with the article ID
        const url = `/reviews/${articleId}`;

        // Send the GET request
        const response = await api.get(url, {}, {
            headers: {
                'ngrok-skip-browser-warning': '69420', // Skip ngrok's browser warning
            },
        });

        if (response.ok) {
            return response.data.data; // Return the reviews data for the article
        } else {
            throw new Error(`Error fetching reviews for article ID: ${response.problem}`);
        }
    } catch (error) {
        console.error("Error in getReviewById:", error);
        throw error;
    }
};

// Method to check if an article exists in the database using the /check_article/{article_id} endpoint
export const checkArticleId = async (articleId) => {
    try {
        // Construct the full URL with the article ID
        const url = `/check_article/${articleId}`;

        // Send the GET request
        const response = await api.get(url, {}, {
            headers: {
                'ngrok-skip-browser-warning': '69420', // Skip ngrok's browser warning
            },
        });

        if (response.ok) {
            return response.data; // Return whether the article exists
        } else {
            throw new Error(`Error checking article existence: ${response.problem}`);
        }
    } catch (error) {
        console.error("Error in checkArticleExists:", error);
        throw error;
    }
};

// Method to check if a review exists in the database using the /check_review/{review_id} endpoint
export const checkReviewId = async (reviewId) => {
    try {
        // Construct the full URL with the review ID
        const url = `/check_review/${reviewId}`;

        // Send the GET request
        const response = await api.get(url, {}, {
            headers: {
                'ngrok-skip-browser-warning': '69420', // Skip ngrok's browser warning
            },
        });

        if (response.ok) {
            return response.data; // Return whether the review exists
        } else {
            throw new Error(`Error checking review existence: ${response.problem}`);
        }
    } catch (error) {
        console.error("Error in checkReviewId:", error);
        throw error;
    }
};

// Method to add a review to the /add_review endpoint
export const addReview = async (reviewData) => {
    try {
        // Construct query parameters using URLSearchParams
        const params = new URLSearchParams({
            review_id: reviewData.review_id,
            article_id: reviewData.article_id,
            rating: reviewData.rating,
            comments: reviewData.comments,
            positive: JSON.stringify(reviewData.positive), // Convert array to JSON string
            negative: JSON.stringify(reviewData.negative), // Convert array to JSON string
            ambiguous: JSON.stringify(reviewData.ambiguous), // Convert array to JSON string
            username: reviewData.username,
            date: reviewData.date,
        });

        // Construct the full URL with query parameters
        const url = `/add_review?${params.toString()}`;

        // Send the POST request
        const response = await api.post(url, {}, {
            headers: {
                'ngrok-skip-browser-warning': '69420', // Skip ngrok's browser warning
            },
        });

        if (response.ok) {
            return response.data; // Return the success message
        } else {
            throw new Error(`Error adding review: ${response.problem}`);
        }
    } catch (error) {
        console.error("Error in addReview:", error);
        throw error;
    }
};

// Method to fetch all review IDs for a specific article from the /get_all_review_ids/{article_id} endpoint
export const getAllReviewIds = async (articleId) => {
    try {
        // Construct the full URL with the article ID
        const url = `/get_all_review_ids/${articleId}`;

        // Send the GET request
        const response = await api.get(url, {}, {
            headers: {
                'ngrok-skip-browser-warning': '69420', // Skip ngrok's browser warning
            },
        });

        if (response.ok) {
            return response.data.review_ids; // Return the list of review IDs
        } else {
            throw new Error(`Error fetching review IDs for article ID: ${response.problem}`);
        }
    } catch (error) {
        console.error("Error in getAllReviewIds:", error);
        throw error;
    }
};