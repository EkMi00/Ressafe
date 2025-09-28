import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function SuccessPage() {
  const navigate = useNavigate();
  const { articleId } = useParams(); // Get the article ID from the URL

  useEffect(() => {
    // Redirect to the corresponding article page after 3 seconds
    const timer = setTimeout(() => {
      navigate(`/review/${articleId}`);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate, articleId]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Success!
      </Typography>
      <Typography variant="body1">
        Your article has been submitted successfully. Redirecting to the article page...
      </Typography>
    </Box>
  );
}

export default SuccessPage;