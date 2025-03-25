import {
    Box,
    Button,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    Rating,
    Grid,
    Card,
    CardContent,
  } from "@mui/material";
  import {
    Header,
  } from "../../components";
  import {
    DownloadOutlined,
  } from "@mui/icons-material";
  import { tokens } from "../../theme";
  import React, { useState } from "react";
  import NavBar from "../layout/navbar";
  
  const defaultNewsSources = [
    {
      url: "https://www.breitbart.com/europe/2025/02/19/president-trump-blasts-zelensky-a-dictator-without-elections/",
      title: "President Trump Blasts Zelensky",
      summary: "President Trump criticizes Zelensky for being a dictator without elections.",
      rating: 3,
      comment: "Interesting perspective, but lacks depth."
    },
    {
      url: "https://www.oann.com/newsroom/bbc-faces-backlash-over-gaza-documentary-featuring-hamas-officials-son-in-positive-light/",
      title: "BBC Faces Backlash Over Gaza Documentary",
      summary: "BBC faces criticism for featuring Hamas official's son in a positive light.",
      rating: 2,
      comment: "Biased reporting, not recommended."
    },
    {
      url: "https://edition.cnn.com/interactive/2019/05/europe/finland-fake-news-intl/",
      title: "Finland's Fight Against Fake News",
      summary: "An in-depth look at Finland's efforts to combat fake news.",
      rating: 5,
      comment: "Very informative and well-researched."
    },
    {
      url: "https://apnews.com/article/fox-news-dominion-lawsuit-trial-trump-2020-0ac71f75acfacc52ea80b3e747fb0afe",
      title: "Fox News Dominion Lawsuit",
      summary: "Fox News faces a lawsuit from Dominion over false election claims.",
      rating: 4,
      comment: "Comprehensive coverage of the lawsuit."
    },
    {
      url: "https://www.politico.com/news/2025/02/23/musk-guidance-conflict-agency-leaders-00205640",
      title: "Musk's Guidance Conflict with Agency Leaders",
      summary: "Elon Musk's guidance conflicts with agency leaders' directives.",
      rating: 3,
      comment: "Interesting read, but could use more details."
    }
  ];
  
  function Dashboard() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isXsDevices = useMediaQuery("(max-width: 436px)");
  
    const [newsSources, setNewsSources] = useState(defaultNewsSources);
  
    const handleSearch = (query) => {
      if (query.trim() === "") {
        setNewsSources(defaultNewsSources);
      } else {
        const filteredSources = defaultNewsSources.filter(source =>
          source.url.toLowerCase().includes(query.toLowerCase()) || 
          source.title.toLowerCase().includes(query.toLowerCase())
        );
        setNewsSources(filteredSources);
      }
    };
  
    return (
      <Box m="20px">
        <Box display="flex" justifyContent="space-between">
          <Header title="Review Tracking" subtitle="Here are your past reviews" />
        </Box>
        <NavBar onSearch={handleSearch} />
        <Box mt="20px">
          <Grid container spacing={3}>
            {newsSources.map((source, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <iframe
                      src={source.url}
                      width="100%"
                      height="200px"
                      style={{ border: "none" }}
                      title={`News Source ${index + 1}`}
                    ></iframe>
                    <Typography variant="h6" gutterBottom>{source.title}</Typography>
                    <Typography variant="body2" gutterBottom>{source.summary}</Typography>
                    <Rating value={source.rating} readOnly />
                    <Typography variant="body2" color="textSecondary" gutterBottom>{source.comment}</Typography>
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