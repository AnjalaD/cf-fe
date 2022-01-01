import React from "react";
import { Box, Container } from "@mui/material";
import bgImage from "./bg.jpg";

export default function PageWrapper({ children }) {
  return (
    <Box sx={{ background: `url(${bgImage})` }}>
      <Container
        sx={{
          minHeight: "100vh",
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
