import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Header } from "../../components";
import NavBar from "../layout/navbar";
import { getReviews } from "../API/index"; // Import the getReviews method
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch reviews when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews();
        setReviews(fetchedReviews);
        setFilteredReviews(fetchedReviews); // Initialize filtered reviews
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredReviews(reviews); // Reset to all reviews
    } else {
      const filtered = reviews.filter(
        (review) =>
          review.title.toLowerCase().includes(query.toLowerCase()) ||
          review.comment.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredReviews(filtered);
    }
  };

  const handleCardClick = (articleId) => {
    navigate(`/review/${articleId}`); // Navigate to the review page
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Review Tracking" subtitle="Here are your past reviews" />
      </Box>
      <NavBar onSearch={handleSearch} />
      <Box mt="20px">
        <Grid container spacing={3}>
          {filteredReviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleCardClick(review.article_id)} // Add onClick handler
                style={{ cursor: "pointer" }} // Add pointer cursor for better UX
              >
                <CardContent>
                  {review.url && (
                    <iframe
                      src={review.url}
                      title={`Article ${index}`}
                      style={{
                        width: "100%",
                        height: "250px",
                        border: "none",
                        marginTop: "10px",
                      }}
                    ></iframe>
                  )}
                  <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>
                    {review.summary}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {review.comment}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;