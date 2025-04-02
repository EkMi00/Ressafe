import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid 
} from "@mui/material";
import React, { useState } from "react";
import NavBar from "../layout/navbar";
import { addArticle, checkArticleId } from "../API/index"; // Import checkArticleId method

function ArticleForm() {
  const [formData, setFormData] = useState({
    article_id: "", // Add article_id field
    url: "",
    summary: "",
    date: "", // Add date field
    comment: "",
  });

  const generateUniqueArticleId = async () => {
    let uniqueId;
    let isUnique = false;

    while (!isUnique) {
      uniqueId = Math.random().toString(36).substr(2, 8); // Generate an 8-character ID
      try {
        const exists = await checkArticleId(uniqueId); // Check if the ID exists in the database
        if (!exists) {
          isUnique = true; // If the ID does not exist, it's unique
        }
      } catch (error) {
        console.error("Error checking article ID uniqueness:", error);
        break; // Exit the loop if there's an error
      }
    }

    return uniqueId;
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace("T", " "); // Format as YY-MM-DD HH:MM:SS
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      article_id: formData.article_id || (await generateUniqueArticleId()), // Ensure article_id is unique
      date: formData.date || getCurrentDate(), // Ensure date is set
    };

    try {
      const response = await addArticle(updatedFormData); // Use addArticle to post the request
      // console.log("Review added successfully:", response);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleAutoFill = () => {
    setFormData({
      article_id: "1q87yvxa", // Generate a random article_id
      date: getCurrentDate(), // Set the current date
      url: "https://www.straitstimes.com/world/middle-east/israel-panel-approves-2025-budget-set-for-final-vote-in-parliament-by-end-march",
      comment: "The article from The Straits Times titled 'Israel panel approves 2025 budget, set for final vote in parliament by end-March' reports on the Israeli government's budget approval process.",
      summary: "The article outlines the steps taken by Israel’s parliament to approve the 2025 budget.",
    });
  };

  return (
    <Box m="20px">
      <NavBar />
      <Box mt="20px">
        <Typography variant="h4" gutterBottom>
          Rate a News Article
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {formData.url && (
              <Box mb="20px">
                <iframe
                  src={formData.url}
                  title="News Article"
                  width="100%"
                  height="500px"
                  style={{ border: "1px solid #ccc" }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <Box mb="20px">
                <TextField
                  fullWidth
                  label="Article URL"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box mb="20px">
                <TextField
                  fullWidth
                  label="Summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="Provide a brief summary of the article"
                  required
                />
              </Box>
              <Box mb="20px">
                <TextField
                  fullWidth
                  label="Comments"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  multiline
                  rows={10}
                  placeholder="Elaborate on your choice (up to 6 lines)"
                />
              </Box>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleAutoFill} style={{ marginLeft: "10px" }}>
                Auto Fill
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ArticleForm;