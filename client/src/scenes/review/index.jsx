import { Box, Typography, Chip, Card, CardContent, Grid, Divider, CardActions, Button, TextField, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, Select, MenuItem, RadioGroup, Radio } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../layout/navbar";
import { getArticleById, getReviewById, addReview, getAllReviewIds } from "../API/index"; // Import the getReviewById, addReview, and getAllReviewIds methods

const positiveAdjectives = ["Reliable", "Trustworthy", "Accurate", "Authoritative", "Verified"];
const negativeAdjectives = ["Biased", "Misleading", "Sensationalized", "Inaccurate", "Unreliable"];
const ambiguousAdjectives = ["Controversial", "Interpretive", "Opinionated", "Subjective", "Speculative"];

const generateReviewId = async (articleId) => {
  let reviewId;
  let existingIds = [];

  try {
    // Fetch all existing review IDs for the given article ID from the database
    existingIds = await getAllReviewIds(articleId);
  } catch (error) {
    console.error("Error fetching existing review IDs:", error);
  }

  // Keep generating a new ID until a unique one is found
  do {
    reviewId = Math.random().toString(36).substring(2, 10); // Generate an 8-character alphanumeric string
  } while (existingIds.includes(reviewId));

  return reviewId;
};

function ArticleReview() {
  const { article_id } = useParams(); // Get the review ID from the URL
  const [articleData, setArticleData] = useState(null); // State to store the fetched article data
  const [loadingArticle, setLoadingArticle] = useState(true); // State to manage loading state for article data
  const [reviews, setReviews] = useState([]); // State to store the fetched reviews
  const [loadingReviews, setLoadingReviews] = useState(true); // State to manage loading state for reviews
  const [newReview, setNewReview] = useState({
    review_id: "", // Initialize as an empty string
    article_id: article_id, // Set article_id to the current article's ID
    rating: "",
    comments: "",
    positive: [],
    negative: [],
    ambiguous: [],
    username: "",
    date: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  // Generate a unique review_id when the component mounts
  useEffect(() => {
    const initializeReviewId = async () => {
      try {
        const uniqueReviewId = await generateReviewId(article_id);
        setNewReview((prevReview) => ({
          ...prevReview,
          review_id: uniqueReviewId,
        }));
      } catch (error) {
        console.error("Error generating review ID:", error);
      }
    };

    initializeReviewId();
  }, []); // Runs only once

  // Fetch article and reviews when article_id changes
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await getArticleById(article_id); // Fetch article by ID
        setArticleData(fetchedArticle); // Set the fetched article data
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoadingArticle(false); // Set loading to false after fetching
      }
    };

    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviewById(article_id); // Fetch reviews by article ID
        setReviews(fetchedReviews); // Set the fetched reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoadingReviews(false); // Set loading to false after fetching
      }
    };

    fetchArticle();
    fetchReviews();
  }, [article_id]); // Runs when article_id changes

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event, field) => {
    const { name, checked } = event.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [field]: checked
        ? [...prevReview[field], name]
        : prevReview[field].filter((tag) => tag !== name),
    }));
  };

  const autofillReview = async () => {
    const getRandomTags = (tagsArray, count) => {
      const shuffled = [...tagsArray].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    try {
      // Generate a new unique review_id
      const uniqueReviewId = await generateReviewId(article_id);

      // Define autofill options for positive, negative, and ambiguous sentiments
      const autofillOptions = [
        {
          sentiment: "positive",
          rating: "helpful",
          positive: getRandomTags(positiveAdjectives, 3),
          negative: [],
          ambiguous: [],
          comments: "This article is very reliable and trustworthy.",
          username: "PositiveReviewer",
        },
        {
          sentiment: "negative",
          rating: "not helpful",
          positive: [],
          negative: getRandomTags(negativeAdjectives, 3),
          ambiguous: [],
          comments: "This article is biased and contains misleading information.",
          username: "CriticalReviewer",
        },
        {
          sentiment: "ambiguous",
          rating: "not helpful",
          positive: [],
          negative: [],
          ambiguous: getRandomTags(ambiguousAdjectives, 3),
          comments: "This article is somewhat subjective and open to interpretation.",
          username: "NeutralReviewer",
        },
      ];

      // Randomly select one of the autofill options
      const selectedOption = autofillOptions[Math.floor(Math.random() * autofillOptions.length)];

      // Update the newReview state with the selected option
      setNewReview((prevReview) => ({
        ...prevReview,
        review_id: uniqueReviewId, // Reset review_id
        rating: selectedOption.rating,
        positive: selectedOption.positive,
        negative: selectedOption.negative,
        ambiguous: selectedOption.ambiguous,
        comments: selectedOption.comments,
        username: selectedOption.username,
      }));
    } catch (error) {
      console.error("Error generating new review ID during autofill:", error);
    }
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    try {
      // Call the addReview API method with newReview data
      const response = await addReview(newReview);
      // console.log("Review added successfully:", response);

      // Optionally, refresh the reviews list after adding a new review
      const fetchedReviews = await getReviewById(article_id);
      setReviews(fetchedReviews);
      useNavigate(`/article/${article_id}`); // Redirect to the article page
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loadingArticle || loadingReviews) {
    return <Typography variant="h6">Loading data...</Typography>;
  }

  if (!articleData) {
    return <Typography variant="h6">Article not found.</Typography>;
  }

  // Calculate the percentage of positive reviews
  const positiveReviewsCount = reviews.filter((review) => review.rating === "helpful").length;
  const positiveReviewsPercentage = (positiveReviewsCount / reviews.length) * 100;

  // Collect all tags by category and count their occurrences
  const tags = reviews.reduce(
    (acc, review) => {
      review.positive.forEach((tag) => (acc.positive[tag] = (acc.positive[tag] || 0) + 1));
      review.negative.forEach((tag) => (acc.negative[tag] = (acc.negative[tag] || 0) + 1));
      review.ambiguous.forEach((tag) => (acc.ambiguous[tag] = (acc.ambiguous[tag] || 0) + 1));
      return acc;
    },
    { positive: {}, negative: {}, ambiguous: {} }
  );

  return (
    <Box m="20px">
      <NavBar />
      <Box mt="20px">
        <Typography variant="h4" gutterBottom>
          Article Review
        </Typography>
        <Grid container spacing={3}>
          {/* Left Section: Article iframe */}
          <Grid item xs={12} md={8}>
            <Box mb="20px" style={{ height: "400px" }}>
              <iframe
                src={articleData.url}
                title="News Article"
                width="100%"
                height="100%"
                style={{ border: "1px solid #ccc" }}
              />
            </Box>
          </Grid>

          {/* Right Section: Article details */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} style={{ height: "400px", display: "flex", flexDirection: "column" }}>
              <CardContent style={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Article Details
                </Typography>
                <Box mb="10px">
                  <Typography variant="body2" color="textSecondary">
                    <strong>URL:</strong>
                  </Typography>
                  <Typography variant="body2">
                    <a href={articleData.url} target="_blank" rel="noopener noreferrer">
                      {articleData.url}
                    </a>
                  </Typography>
                </Box>
                <Box mb="10px">
                  <Typography variant="body2" color="textSecondary">
                    <strong>Summary:</strong>
                  </Typography>
                  <Typography variant="body2">{articleData.summary}</Typography>
                </Box>
                <Box mb="10px">
                  <Typography variant="body2" color="textSecondary">
                    <strong>Comment:</strong>
                  </Typography>
                  <Typography variant="body2">{articleData.comment}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Card elevation={3} style={{ marginBottom: "20px" }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <Box mb={1}>
                    <Typography
                      variant="h4"
                      color="primary"
                      style={{ fontWeight: "bold", textDecoration: "underline" }}
                    >
                      {positiveReviewsPercentage.toFixed(1)}%
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" align="center">
                      found this article useful
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                  {/* Positive Tags */}
                  <Box flex={1} mr={2}>
                    <Typography variant="h6">Positive Tags</Typography>
                    <Box display="flex" flexWrap="wrap">
                      {Object.entries(tags.positive).map(([tag, count], index) => (
                        <Chip
                          key={index}
                          label={`${tag} (${count})`}
                          style={{ margin: "2px", backgroundColor: "green", color: "white" }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Negative Tags */}
                  <Box flex={1} mr={2}>
                    <Typography variant="h6">Negative Tags</Typography>
                    <Box display="flex" flexWrap="wrap">
                      {Object.entries(tags.negative).map(([tag, count], index) => (
                        <Chip
                          key={index}
                          label={`${tag} (${count})`}
                          style={{ margin: "2px", backgroundColor: "red", color: "white" }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Ambiguous Tags */}
                  <Box flex={1}>
                    <Typography variant="h6">Ambiguous Tags</Typography>
                    <Box display="flex" flexWrap="wrap">
                      {Object.entries(tags.ambiguous).map(([tag, count], index) => (
                        <Chip
                          key={index}
                          label={`${tag} (${count})`}
                          style={{ margin: "2px", backgroundColor: "grey", color: "white" }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Grid container spacing={3}>
          {reviews.map((review, index) => (
            <Grid item xs={12} key={index}>
              <Card elevation={3} style={{ display: "flex", flexDirection: "column" }}>
                <CardContent style={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Box mb="20px">
                        <Typography variant="h6">Reviewed by: {review.username}</Typography>
                        <Typography>Date: {review.reviewDate}</Typography>
                      </Box>
                      <Divider />
                      <Box mb="20px" mt="20px">
                        <Typography variant="h6">Tags:</Typography>
                        {review.positive.map((tag) => (
                          <Chip key={tag} label={tag} style={{ margin: "2px", backgroundColor: "green", color: "white" }} />
                        ))}
                        {review.negative.map((tag) => (
                          <Chip key={tag} label={tag} style={{ margin: "2px", backgroundColor: "red", color: "white" }} />
                        ))}
                        {review.ambiguous.map((tag) => (
                          <Chip key={tag} label={tag} style={{ margin: "2px", backgroundColor: "grey", color: "white" }} />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box mb="20px">
                        <Typography variant="h6">Comments:</Typography>
                        <Typography>{review.comments}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions style={{ justifyContent: "flex-start" }}>
                  <Button variant="contained" color="primary">
                    Is this review helpful?
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            <Card elevation={3} style={{ marginBottom: "20px" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Add a Review
                </Typography>
                <form onSubmit={handleSubmitReview}>
                  {/* Username */}
                  <Box mb="10px">
                    <TextField
                      fullWidth
                      label="Alias"
                      name="username"
                      value={newReview.username}
                      onChange={handleInputChange}
                      required
                    />
                  </Box>

                  {/* Rating */}
                  <Box mb="10px">
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Rating</FormLabel>
                      <RadioGroup
                        name="rating"
                        value={newReview.rating}
                        onChange={handleInputChange}
                        row // Makes the radio buttons appear in a row
                      >
                        <FormControlLabel value="helpful" control={<Radio />} label="Helpful" />
                        <FormControlLabel value="not helpful" control={<Radio />} label="Not Helpful" />
                      </RadioGroup>
                    </FormControl>
                  </Box>

                  {/* Tags */}
                  <Grid container spacing={3}>
                    {/* Positive Tags */}
                    <Grid item xs={12} md={4}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Positive Tags</FormLabel>
                        <FormGroup>
                          {positiveAdjectives.map((tag) => (
                            <FormControlLabel
                              key={tag}
                              control={
                                <Checkbox
                                  name={tag}
                                  checked={newReview.positive.includes(tag)}
                                  onChange={(e) => handleCheckboxChange(e, "positive")}
                                />
                              }
                              label={tag}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </Grid>

                    {/* Negative Tags */}
                    <Grid item xs={12} md={4}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Negative Tags</FormLabel>
                        <FormGroup>
                          {negativeAdjectives.map((tag) => (
                            <FormControlLabel
                              key={tag}
                              control={
                                <Checkbox
                                  name={tag}
                                  checked={newReview.negative.includes(tag)}
                                  onChange={(e) => handleCheckboxChange(e, "negative")}
                                />
                              }
                              label={tag}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </Grid>

                    {/* Ambiguous Tags */}
                    <Grid item xs={12} md={4}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Ambiguous Tags</FormLabel>
                        <FormGroup>
                          {ambiguousAdjectives.map((tag) => (
                            <FormControlLabel
                              key={tag}
                              control={
                                <Checkbox
                                  name={tag}
                                  checked={newReview.ambiguous.includes(tag)}
                                  onChange={(e) => handleCheckboxChange(e, "ambiguous")}
                                />
                              }
                              label={tag}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* Comments */}
                  <Box mb="10px">
                    <TextField
                      fullWidth
                      label="Comments"
                      name="comments"
                      value={newReview.comments}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      required
                    />
                  </Box>

                  {/* Submit Button */}
                  <Button variant="contained" color="primary" type="submit">
                    Submit Review
                  </Button>

                  {/* Autofill Button */}
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                    onClick={autofillReview}
                  >
                    Autofill Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ArticleReview;