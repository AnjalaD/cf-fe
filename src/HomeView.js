import React from "react";
import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import PageWrapper from "./PageWrapper";

export default function HomeView() {
  return (
    <PageWrapper>
      <Stack
        gap={4}
        className="col-md-5 mx-auto justify-content-center text-white"
      >
        <h1 className="text-center">Career Fair 2021</h1>
        <p className="text-center">
          Department of Computer Science & Engineering
          <br />
          University of Moratuwa
        </p>

        <Link to="/students">
          <Button variant="warning" className="w-100">
            Students
          </Button>
        </Link>
        <Link to="/company">
          <Button variant="warning" className="w-100">
            Companies
          </Button>
        </Link>
      </Stack>
    </PageWrapper>
  );
}
