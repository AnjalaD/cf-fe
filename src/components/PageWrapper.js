import React from "react";
import { Box, Container, Typography } from "@mui/material";
import bgImage from "../bg.jpg";

export default function PageWrapper({ children, lastUpdated }) {
  return (
    <Box sx={{ background: `url(${bgImage})` }}>
      <Container
        sx={{
          minHeight: "100vh",
        }}
      >
        {lastUpdated && (
          <Typography variant="body1" align="right" color="white">
            {lastUpdated}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  );
}
