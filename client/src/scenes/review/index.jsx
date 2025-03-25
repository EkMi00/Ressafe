import { Box, Typography, Chip, Button, Card, CardContent, CardActions, Grid, Divider, Rating } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../layout/navbar";

// URL of the article
const articleUrl = "https://www.straitstimes.com/world/middle-east/israel-panel-approves-2025-budget-set-for-final-vote-in-parliament-by-end-march";

// Sample JSON array representing multiple reviews for the same URL
const reviewsData = [
  {
    rating: "helpful",
    comments: "This article provides detailed information about the budget approval process in Israel.",
    positive: ["Reliable", "Trustworthy"],
    negative: ["Biased"],
    ambiguous: ["Controversial"],
    username: "John Doe",
    reviewDate: "March 24, 2025",
    reviewCount: 10,
    ratingScore: 4
  },
  {
    rating: "not helpful",
    comments: "This article lacks sufficient evidence and is biased.",
    positive: ["Well-written"],
    negative: ["Biased", "Inaccurate"],
    ambiguous: ["Speculative"],
    username: "Jane Smith",
    reviewDate: "March 25, 2025",
    reviewCount: 5,
    ratingScore: 2
  }
  // Add more review objects as needed
];

function ArticleReview() {
  const { reviewId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Simulate fetching review data from an API or other source
    setReviews(reviewsData);
  }, []);

  if (reviews.length === 0) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  // Calculate the average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.ratingScore, 0) / reviews.length;

  // Calculate the percentage of positive reviews
  const positiveReviewsCount = reviews.filter(review => review.rating === "helpful").length;
  const positiveReviewsPercentage = (positiveReviewsCount / reviews.length) * 100;

  // Collect all tags by category and count their occurrences
  const tags = reviews.reduce(
    (acc, review) => {
      review.positive.forEach(tag => acc.positive[tag] = (acc.positive[tag] || 0) + 1);
      review.negative.forEach(tag => acc.negative[tag] = (acc.negative[tag] || 0) + 1);
      review.ambiguous.forEach(tag => acc.ambiguous[tag] = (acc.ambiguous[tag] || 0) + 1);
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
        <Box mb="20px">
          <iframe
            src={articleUrl}
            title="News Article"
            width="100%"
            height="400px"
            style={{ border: "1px solid #ccc" }}
          />
        </Box>
        <Card elevation={3} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                  <Box mb={1}>
                    <Typography variant="h5">Overall Credibility</Typography>
                  </Box>
                  <Box mb={1}>
                    <Rating value={averageRating} readOnly precision={0.1} />
                  </Box>
                  <Box mb={1}>
                    <Typography variant="h4">{averageRating.toFixed(1)} / 5</Typography>
                  </Box>
                  <Box mb={1}>
                    <Typography variant="body2">({reviews.length} reviews)</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box mb="10px">
                  <Typography variant="h6">Positive Tags</Typography>
                  <Box display="flex" flexWrap="wrap">
                    {Object.entries(tags.positive).map(([tag, count], index) => (
                      <Chip key={index} label={`${tag} (${count})`} style={{ margin: "2px", backgroundColor: "green", color: "white" }} />
                    ))}
                  </Box>
                </Box>
                <Box mb="10px">
                  <Typography variant="h6">Negative Tags</Typography>
                  <Box display="flex" flexWrap="wrap">
                    {Object.entries(tags.negative).map(([tag, count], index) => (
                      <Chip key={index} label={`${tag} (${count})`} style={{ margin: "2px", backgroundColor: "red", color: "white" }} />
                    ))}
                  </Box>
                </Box>
                <Box mb="10px">
                  <Typography variant="h6">Ambiguous Tags</Typography>
                  <Box display="flex" flexWrap="wrap">
                    {Object.entries(tags.ambiguous).map(([tag, count], index) => (
                      <Chip key={index} label={`${tag} (${count})`} style={{ margin: "2px", backgroundColor: "grey", color: "white" }} />
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                  <Box mb={1}>
                    <Typography variant="h4" color="primary" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                      {positiveReviewsPercentage.toFixed(1)}%
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">found this article useful</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Grid container spacing={3}>
          {reviews.map((review, index) => (
            <Grid item xs={12} key={index}>
              <Card elevation={3} style={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent style={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Box mb="20px">
                        <Typography variant="h6">Reviewed by: {review.username}</Typography>
                        <Typography>Date: {review.reviewDate}</Typography>
                        <Typography>Credibility: {review.reviewCount}</Typography>
                        <Rating value={review.ratingScore} readOnly />
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
                <CardActions style={{ justifyContent: 'flex-start' }}>
                  <Button variant="contained" color="primary">
                    Is this review helpful?
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default ArticleReview;