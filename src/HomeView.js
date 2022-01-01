import React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import PageWrapper from "./PageWrapper";

export default function HomeView() {
  return (
    <PageWrapper>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack gap={4}>
          <Typography variant="h2" align="center" color="white">
            Career Fair 2021
          </Typography>
          <Typography variant="body" align="center" color="white">
            Department of Computer Science & Engineering
            <br />
            University of Moratuwa
          </Typography>

          <Link to="/students">
            <Button variant="contained" color="warning" fullWidth>
              Students
            </Button>
          </Link>
          <Link to="/company">
            <Button variant="contained" color="secondary" fullWidth>
              Companies
            </Button>
          </Link>
        </Stack>
      </Container>
    </PageWrapper>
  );
}
