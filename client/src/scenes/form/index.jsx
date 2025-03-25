import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    FormControl, 
    FormLabel, 
    FormGroup, 
    FormControlLabel, 
    Checkbox, 
    Grid 
  } from "@mui/material";
  import React, { useState } from "react";
  import NavBar from "../layout/navbar";
  
  const positiveAdjectives = [
    "Reliable", "Trustworthy", "Accurate", "Authoritative", "Verified"
  ];
  
  const negativeAdjectives = [
    "Biased", "Misleading", "Sensationalized", "Inaccurate", "Unreliable"
  ];
  
  const ambiguousAdjectives = [
    "Controversial", "Interpretive", "Opinionated", "Subjective", "Speculative"
  ];
  
  function ArticleForm() {
    const [formData, setFormData] = useState({
      url: "",
      rating: "",
      comments: "",
      positive: [],
      negative: [],
      ambiguous: []
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleCheckboxChange = (category, adjective) => {
      setFormData((prevData) => {
        const updatedCategory = prevData[category].includes(adjective)
          ? prevData[category].filter(item => item !== adjective)
          : [...prevData[category], adjective];
        return { ...prevData, [category]: updatedCategory };
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Process the form data (e.g., send it to an API)
      console.log("Form submitted:", formData);
  
      try {
        const response = await fetch("http://localhost:8000/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const result = await response.json();
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const handleAutoFill = () => {
      setFormData({
        url: "https://www.straitstimes.com/world/middle-east/israel-panel-approves-2025-budget-set-for-final-vote-in-parliament-by-end-march",
        rating: "helpful",
        comments: "This article provides detailed information about the budget approval process in Israel.",
        positive: ["Reliable", "Trustworthy"],
        negative: [],
        ambiguous: []
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
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Positive Adjectives (High Credibility)</FormLabel>
                      <FormGroup>
                        {positiveAdjectives.map((adjective) => (
                          <FormControlLabel
                            key={adjective}
                            control={
                              <Checkbox
                                checked={formData.positive.includes(adjective)}
                                onChange={() => handleCheckboxChange("positive", adjective)}
                                name="positive"
                              />
                            }
                            label={adjective}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Negative Adjectives (Low Credibility)</FormLabel>
                      <FormGroup>
                        {negativeAdjectives.map((adjective) => (
                          <FormControlLabel
                            key={adjective}
                            control={
                              <Checkbox
                                checked={formData.negative.includes(adjective)}
                                onChange={() => handleCheckboxChange("negative", adjective)}
                                name="negative"
                              />
                            }
                            label={adjective}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Ambiguous Adjectives (Neutral or Context-Dependent)</FormLabel>
                      <FormGroup>
                        {ambiguousAdjectives.map((adjective) => (
                          <FormControlLabel
                            key={adjective}
                            control={
                              <Checkbox
                                checked={formData.ambiguous.includes(adjective)}
                                onChange={() => handleCheckboxChange("ambiguous", adjective)}
                                name="ambiguous"
                              />
                            }
                            label={adjective}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Box mb="20px">
                  <TextField
                    fullWidth
                    label="Comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    multiline
                    rows={6}
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