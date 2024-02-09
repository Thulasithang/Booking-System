import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselItem from "../molecules/Carousel";

const HomePage = () => {
  return (
    <div>
      <CarouselItem />
      <Container
        style={{ backgroundColor: "green", marginTop: 50 }}
        maxWidth="100%"
      >
        {/* <Grid container spacing={3} justifyContent='flex-end' direction='row' style={{ backgroundColor: 'black', width: '80%', textAlign: 'start'}}> */}
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Grid item xs={12}>
            <Typography variant="h3">Welcome to the Home Page</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              This is the home page of the webapp.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container
        maxWidth="lg"
        style={{ backgroundColor: "red", marginTop: 50 }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3" align="center">
              Welcome to the Home Page
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              This is the home page of the webapp.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
